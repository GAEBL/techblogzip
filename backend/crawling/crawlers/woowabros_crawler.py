from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
from datetime import datetime
from tqdm import tqdm
from time import sleep


def get_contents(company):
    posts = Post.objects.filter(company=company, contents='')
    for post in tqdm(posts):
        try:
            driver.get(post.url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = company.name
            return ERROR_MESSAGE

        div = CSS_SELECTOR('div.post-content')[0]
        articles = div.find_elements_by_css_selector('h1')
        articles += div.find_elements_by_css_selector('h2')
        articles += div.find_elements_by_css_selector('h3')
        articles += div.find_elements_by_css_selector('p')

        try:
            image = div.find_elements_by_css_selector(
                'img')[0].get_attribute('src')
        except:
            image = ''

        contents = ''
        for article in articles:
            if not article.find_elements_by_css_selector('code'):
                contents += article.text + ' '

        post.contents = contents
        post.image = image
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING WOOWABROS'))
    baemin = Company.objects.get_or_create(
        name='WOOWABROS', url=url, description='WOOWABROS')[0]

    try:
        driver.get(url)
        sleep(10)
    except:
        ERROR_MESSAGE['company'] = baemin.name
        return ERROR_MESSAGE

    posts = CSS_SELECTOR('div.list-module')
    for post in posts:
        element_selector = post.find_element_by_css_selector

        title = element_selector('h2.post-link').text
        if Post.objects.filter(company=baemin, title=title):
            return get_contents(baemin)

        date = element_selector('span.post-meta').text.split(' , ')[0]
        date = datetime.strftime(
            datetime.strptime(date, '%b %d, %Y'), '%Y.%m.%d')
        post_url = element_selector('a').get_attribute('href')

        Post.objects.get_or_create(
            company=baemin, title=title, contents='', date=date, image='', url=post_url)

    return get_contents(baemin)
