from selenium import webdriver
import os

options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument('lang=ko-KR')
options.add_argument(
    # 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'
)  # 주의: 리눅스에서 변경할 필요

PATH = os.getcwd().replace('\\', '/')
driver = webdriver.Chrome(
    # f'{PATH}/crawling/crawlers/chromedriver.exe', options=options
    'C:/Users/multicampus/yye/s02p31c103/backend/crawling/crawlers/chromedriver.exe', options=options
)
