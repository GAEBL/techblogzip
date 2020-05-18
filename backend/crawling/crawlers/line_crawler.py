from .config import options, driver
from mainapp.models import Company, Post
from tqdm import tqdm
import time

driver_selector = driver.find_elements_by_css_selector
line = Company.objects.get(name='LINE')


def get_contents():
    posts = Post.objects.filter(company=line)
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents = driver_selector('div.entry-content.single-page')[0]
        articles = contents.find_elements_by_css_selector('p')
        try:
            image = contents.find_elements_by_css_selector(
                'img'
            )[0].get_attribute('src')
        except:
            image = ''

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.image = image
        post.save()


def get_posts(url):
    global driver_selector, line

    cnt = 1
    while True:
        try:
            driver.get(url)
            time.sleep(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('div.article-inner')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('a.plain').text
                if len(Post.objects.filter(company=line, title=title)) > 0:
                    get_contents()
                    return {'status': 200, 'message': 'LINE에 대한 Crawling을 완료했습니다.'}

                date = element_selector('span.byline').text
                url = element_selector('a.plain').get_attribute('href')

                _, is_created = Post.objects.get_or_create(
                    company=line, title=title, contents='', date=date,
                    image='', url=url
                )

            is_ended = len(driver_selector('a.next.page-number')) == 0
            if is_ended == False:
                cnt += 1
                url = f'https://engineering.linecorp.com/ko/blog/page/{cnt}/'
            else:
                get_contents()
                return {'status': 200, 'message': 'LINE에 대한 Crawling을 완료했습니다.'}
