#!/usr/bin/env python
# coding: utf-8
"""
Utilities for handing data io.
"""
import boto3

def read_text_s3(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, bucket_name, object_key):
    """
    Read a text object from AWS S3 and return a String object ready to be consumed
    in memory.
    """ 
    s3_client = boto3.client('s3', region_name=AWS_DEFAULT_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    file_obj = s3_client.get_object(Bucket=bucket_name, Key=object_key)
    body = file_obj['Body']
    file_string = body.read().decode('utf-8')
    return file_string
