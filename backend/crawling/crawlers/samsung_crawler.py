from .config import driver
from mainapp.models import Company, Post
from tqdm import tqdm
import time


def get_contents(driver_selector, samsung):
    posts = Post.objects.filter(company=samsung, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents = driver_selector('div.txt_wrap')[0]
        articles = contents.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()


def get_posts(url):
    driver_selector = driver.find_elements_by_css_selector
    samsung = Company.objects.get(name='SAMSUNG SDS')
    scroll_pause_time = 2

    try:
        driver.get(url)
        time.sleep(10)

        last_height = driver.execute_script(
            'return document.body.scrollHeight')
        while True:
            print(last_height)
            driver.execute_script(
                'window.scrollTo(0, document.body.scrollHeight);')

            time.sleep(scroll_pause_time)
            driver.execute_script(
                'window.scrollTo(0, document.body.scrollHeight-50);')
            time.sleep(scroll_pause_time)

            is_ended = driver.find_element_by_css_selector(
                'button.button'
            ).get_attribute('style')
            if is_ended == 'visibility: visible;':
                driver.find_element_by_css_selector('button.button').click()

            new_height = driver.execute_script(
                'return document.body.scrollHeight')
            if new_height == last_height:
                break
            last_height = new_height
    except:
        return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
    else:
        post_div = driver_selector('div.thumbList')[0]
        posts = post_div.find_elements_by_css_selector('div.thumb')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('a').text
            if len(Post.objects.filter(company=samsung, title=title)) > 0:
                get_contents(driver_selector, samsung)
                return {'status': 200, 'message': 'SAMSUNG SDS에 대한 Crawling을 완료했습니다.'}

            date = element_selector(
                'span.thumb_date').text.replace('-', '.')

            image = element_selector('a').get_attribute('style')
            image = image.lstrip('background-image: url("').rstrip('");')

            url = element_selector('a').get_attribute('onclick')
            url = url.lstrip("makeUrl('").rstrip(",'N')")
            url = 'https://www.samsungsds.com/' + url

            _, is_created = Post.objects.get_or_create(
                company=samsung, title=title, contents='', date=date,
                image=image, url=url
            )

        get_contents(driver_selector, samsung)
        return {'status': 200, 'message': 'SAMSUNG SDS에 대한 Crawling을 완료했습니다.'}
