from .config import options, driver
from mainapp.models import Company, Post
from tqdm import tqdm
import json
from selenium import webdriver
import os


# driver = webdriver.Chrome('.//chromedriver')
driver_selector = driver.find_elements_by_css_selector
samsung = Company.objects.get(name='삼성SDS')

def get_contents():
    posts = Post.objects.filter(company=samsung, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        driver.implicitly_wait(10)

        contents = driver_selector('div.txt_wrap')[0]
        articles = contents.find_elements_by_css_selector('p')  # h3미포함

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()


def get_posts(url):
    global driver_selector, samsung

    cnt = 0
    while True:
        try:
            driver.get(url)
            driver.implicitly_wait(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('div.thumb')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('a').text
                if len(Post.objects.filter(company=samsung, title=title)) > 0:
                    get_contents()
                    return {'status': 200, 'message': '삼성SDS에 대한 Crawling을 완료했습니다.'}

                date = element_selector('span.thumb_date').text
                image = element_selector('a').get_attribute('style')
                image = image.lstrip('background-image: url("')
                image = image.rstrip('");')
                tempurl = element_selector('a').get_attribute('onclick')
                tempurl = tempurl.lstrip("makeUrl('")
                tempurl = tempurl.rstrip(",'N')")
                url = 'https://www.samsungsds.com/' + tempurl

                _, is_created = Post.objects.get_or_create(
                    company=samsung, title=title, contents='', date=date,
                    image=image, url=url
                )

            is_ended = driver.find_element_by_css_selector('button.button').get_attribute('style')
            # is_ended = is_ended.lstrip('visibility: ') 
            # print(is_ended)
            if is_ended == 'visibility: visible;':
                driver.find_element_by_css_selector('#btnLoadMore').click()
            else:
                get_contents()
                return {'status': 200, 'message': '삼성SDS에 대한 Crawling을 완료했습니다.'}
