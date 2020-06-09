from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
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

        articles = CSS_SELECTOR('h1')
        articles += CSS_SELECTOR('h2')
        articles += CSS_SELECTOR('h3')
        articles += CSS_SELECTOR('p')

        contents = ''
        for article in articles:
            if not article.find_elements_by_css_selector('code'):
                contents += article.text + ' '

        post.contents = contents
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING COUPANG TECH'))
    coupang = Company.objects.get_or_create(
        name='COUPANG TECH', url=url, description='COUPANG TECH')[0]

    try:
        driver.get(url)
        sleep(10)
    except:
        ERROR_MESSAGE['company'] = coupang.name
        return ERROR_MESSAGE

    posts = CSS_SELECTOR('div.col.js-trackPostPresentation')
    for post in posts:
        element_selector = post.find_element_by_css_selector

        title = element_selector('div.u-letterSpacingTight').text
        if Post.objects.filter(company=coupang, title=title):
            return get_contents(coupang)

        date = element_selector('time').get_attribute(
            'datetime').split('T')[0].replace('-', '.')

        image = element_selector(
            'a.u-block').get_attribute('style').split('("')[1].split('")')[0]
        url = element_selector('a').get_attribute('href')

        Post.objects.get_or_create(
            company=coupang, title=title, contents='', date=date, image=image, url=url)

    return get_contents(coupang)
