import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestLambda = new NodejsFunction(this, 'NestLambda', {
      functionName: 'NestLambda',
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      entry: path.join(__dirname, '../../dist/lambda.js'),
      handler: 'handler',
      depsLockFilePath: path.join(__dirname, '../../package-lock.json'),
      bundling: {
        minify: false,
        sourceMap: true,
        externalModules: [
          '@aws-sdk/*',
          'aws-sdk',
          'class-transformer',
          'class-validator',
        ],
        target: 'node20',
        nodeModules: [
          '@nestjs/core',
          '@nestjs/common',
          '@nestjs/platform-express',
          'reflect-metadata',
        ],
        forceDockerBundling: false,
      },
      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_PORT: process.env.DB_PORT!,
        DB_USERNAME: process.env.DB_USERNAME!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
        DB_NAME: process.env.DB_NAME!,
      },
    });

    const api = new apigateway.RestApi(this, 'nestApi', {
      restApiName: 'Cart Service',
      description: 'NestJS Cart API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowCredentials: true,
      },
    });

    const integration = new apigateway.LambdaIntegration(nestLambda, {
      proxy: true,
    });

    api.root.addProxy({
      defaultIntegration: integration,
      anyMethod: true,
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
      exportName: 'ApiUrl',
    });
  }
}
