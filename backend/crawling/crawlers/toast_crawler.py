from .config import options, driver
from mainapp.models import Company, Post
from tqdm import tqdm
import time

driver_selector = driver.find_elements_by_css_selector
toast = Company.objects.get(name='TOAST')


def get_contents():
    posts = Post.objects.filter(company=toast, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents = driver_selector('div.tui-editor-contents')[0]
        articles = contents.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()


def get_posts(url):
    global driver_selector, toast

    cnt = 1
    while True:
        try:
            driver.get(url)
            time.sleep(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('a.lst_link')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('h3.tit.ng-binding').text
                if len(Post.objects.filter(company=toast, title=title)) > 0:
                    get_contents()
                    return {'status': 200, 'message': 'TOAST에 대한 Crawling을 완료했습니다.'}

                date = element_selector(
                    'span.date.ng-binding'
                ).text.split(' ')[1]
                image = element_selector(
                    'span.img_area.ng-scope'
                ).get_attribute('style').split('("')[1][:-3]
                url = post.get_attribute('href')

                _, is_created = Post.objects.get_or_create(
                    company=toast, title=title, contents='', date=date,
                    image=image, url=url
                )

            is_ended = len(driver_selector('a.tui-page-btn.tui-next')) == 0
            if is_ended == False:
                cnt += 1
                url = f'https://meetup.toast.com/?page={cnt}'
            else:
                get_contents()
                return {'status': 200, 'message': 'TOAST에 대한 Crawling을 완료했습니다.'}
