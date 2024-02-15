import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export const AppConfig = {
    DAL_URL: "http://customersdal:3000/",
    APIVERSION: "v1.0.0",
    DESCRIPTION: "TF Head Less APIs",
  };
