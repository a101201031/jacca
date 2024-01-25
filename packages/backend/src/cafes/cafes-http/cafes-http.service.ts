import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ThirdPartyConfigService } from '@src/config';
import { queryStringParamsParser } from '@src/util';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class CafesHttpService {
  private searchApiBaseUrl: string;

  private geocodeApiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly thirdPartyConfig: ThirdPartyConfigService,
  ) {
    this.searchApiBaseUrl = 'https://openapi.naver.com/v1/search';
    this.geocodeApiBaseUrl =
      'https://naveropenapi.apigw.ntruss.com/map-geocode/v2';
  }

  async findPlace({
    query,
    display = '4',
    start = '1',
    sort = 'sim',
    filter = 'all',
  }) {
    const queryStringParams = queryStringParamsParser({
      query,
      display,
      start,
      sort,
      filter,
    });
    return firstValueFrom(
      this.httpService
        .get<{
          items: {
            title: string;
            address: string;
            roadAddress: string;
            category: string;
          }[];
        }>(`/local.json${queryStringParams}`, {
          headers: {
            'X-Naver-Client-Id': this.thirdPartyConfig.naver_client_id,
            'X-Naver-Client-Secret': this.thirdPartyConfig.naver_client_secret,
          },
          baseURL: this.searchApiBaseUrl,
        })
        .pipe(
          map((res) =>
            res.data?.items.filter((v) => v.category.indexOf('카페') !== 1),
          ),
          map((items) =>
            items.map((v) => ({
              title: v.title.replaceAll(/<b>|<\/b>/g, ''),
              address: v.address,
              roadAddress: v.roadAddress,
            })),
          ),
        ),
    );
  }

  async findPlaceImage({
    query,
    display = '4',
    start = '1',
    sort = 'sim',
    filter = 'all',
  }) {
    const queryStringParams = queryStringParamsParser({
      query,
      display,
      start,
      sort,
      filter,
    });
    return firstValueFrom(
      this.httpService
        .get<{
          items: { title: string; link: string }[];
        }>(`/image${queryStringParams}`, {
          headers: {
            'X-Naver-Client-Id': this.thirdPartyConfig.naver_client_id,
            'X-Naver-Client-Secret': this.thirdPartyConfig.naver_client_secret,
          },
          baseURL: this.searchApiBaseUrl,
        })
        .pipe(
          map((res) =>
            res.data?.items.map((v) => ({
              title: v.title,
              url: v.link,
            })),
          ),
        ),
    );
  }

  async findGeocodeByQuery({ query, page = '1', count = '10' }) {
    const queryStringParams = queryStringParamsParser({
      query,
      page,
      count,
    });

    return firstValueFrom(
      this.httpService
        .get<{
          addresses: {
            roadAddress: string;
            jibunAddress: string;
            x: string;
            y: string;
          }[];
        }>(`/geocode${queryStringParams}`, {
          headers: {
            'X-NCP-APIGW-API-KEY-ID':
              this.thirdPartyConfig.ncp_apigw_api_key_id,
            'X-NCP-APIGW-API-KEY': this.thirdPartyConfig.ncp_apigw_api_key,
          },
          baseURL: this.geocodeApiBaseUrl,
        })
        .pipe(
          map((res) => res.data?.addresses),
          map((addresses) => ({
            address: addresses[0].jibunAddress,
            roadAddress: addresses[0].roadAddress,
            lng: addresses[0].x,
            lat: addresses[0].y,
          })),
        ),
    );
  }
}
