from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
from tqdm import tqdm
import time


def get_contents(company):
    posts = Post.objects.filter(company=company, contents='')
    for post in tqdm(posts):
        try:
            driver.get(post.url)
            driver.implicitly_wait(30)
        except:
            ERROR_MESSAGE['company'] = company.name
            return ERROR_MESSAGE

        div = CSS_SELECTOR('div.txt_wrap')[0]
        articles = div.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    samsung = Company.objects.get_or_create(
        name='SAMSUNG SDS', url=url, description='SAMSUNG SDS')[0]

    SCROLL_PAUSE_TIME = 2
    HEIGHT_SCRIPT = 'return document.body.scrollHeight'
    SCROLL_SCRIPT = 'window.scrollTo(0, document.body.scrollHeight);'

    try:
        driver.get(url)
        driver.implicitly_wait(30)

        last_height = driver.execute_script(HEIGHT_SCRIPT)
        while True:
            driver.execute_script(SCROLL_SCRIPT)

            is_ended = driver.find_element_by_css_selector(
                'button.button').get_attribute('style')
            if is_ended == 'visibility: visible;':
                driver.find_element_by_css_selector('button.button').click()

            new_height = driver.execute_script(HEIGHT_SCRIPT)
            if new_height == last_height:
                break
            last_height = new_height
    except:
        ERROR_MESSAGE['company'] = samsung.name
        return ERROR_MESSAGE

    posts = CSS_SELECTOR('div.thumb')
    for post in posts:
        element_selector = post.find_element_by_css_selector

        title = element_selector('a').text
        if len(Post.objects.filter(company=samsung, title=title)) > 0:
            return get_contents(samsung)

        date = element_selector(
            'span.thumb_date').text.replace('-', '.')

        image = element_selector('a').get_attribute('style')
        image = image.lstrip('background-image: url("').rstrip('");')

        post_url = element_selector('a').get_attribute('onclick')
        post_url = post_url.lstrip("makeUrl('").rstrip(",'N')")
        post_url = 'https://www.samsungsds.com' + post_url

        Post.objects.get_or_create(
            company=samsung, title=title, contents='', date=date, image=image, url=post_url)

    return get_contents(samsung)
