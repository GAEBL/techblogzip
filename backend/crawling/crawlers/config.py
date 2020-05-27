from selenium import webdriver
import platform
import os

options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('window-size=1920x1080')
options.add_argument('lang=ko-KR')
options.add_argument(
    'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36')

system_name = platform.system()
if system_name is 'Windows':
    driver = 'chromedriver.exe'
else:
    driver = 'chromedriver'

PATH = os.getcwd().replace('\\', '/')
driver = webdriver.Chrome(
    f'{PATH}/crawling/crawlers/{driver}', options=options)

CSS_SELECTOR = driver.find_elements_by_css_selector

ERROR_MESSAGE = {'status': 400, 'message': 'URL을 불러올 수 없습니다. 나중에 다시 시도해주세요.'}
SUCESS_MESSAGE = {'status': 200, 'message': '정상적으로 게시물을 수집했습니다.'}
