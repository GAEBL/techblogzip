import React from 'react';
import styled from 'styled-components';
import {Card, CardContent, StylesProvider} from '@material-ui/core'


const TrendPost = ({post}) => {
    const CostomCard = styled(Card)`
        display: flex;
        margin-bottom: 1vh;
    `
    const PostImg = styled.img`
        height: 15vh;
        width: 20vh;
    `
    const Summary = styled.p`
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 20px;
        max-height: 60px;
        word-break: break-word;
    `
    const CostomA = styled.a`
        text-decoration: none;
    `
    const Datep = styled.p`
        display: flex;
        justify-content: flex-end;
        margin-right: 1vh;
    `

    const postday = new Date(post.postPublishedAt);
    const formatday = postday.getFullYear() +"." + postday.getMonth() + "." + postday.getDate()
    // https://picsum.photos/300/200
    return (
        <StylesProvider injectFirst>
            <CostomA href={"https://d2.naver.com" + post.url}>
                <CostomCard>
                    
                    <PostImg src={"https://d2.naver.com" + post.postImage} alt=""/>
                    <CardContent>
                        <h3>{post.postTitle}</h3>
                        <Summary>{post.postHtml}</Summary>
                        <Datep>{formatday}</Datep>
                    </CardContent>
                    
                </CostomCard>
            </CostomA>
        </StylesProvider>
    )
}

export default TrendPost;