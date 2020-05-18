import React from 'react';
import styled from 'styled-components';

const CompanyLogos = () => {
    const logo = (url, width, height, color) => {
        const LogoImg = styled.img`
            width: ${width};
            height: ${height};
        `
        const logoimg = process.env.PUBLIC_URL + "/images/" + url;
        const LogoButton = styled.button`
            background-color: ${color};
            border: solid black 1px;
            margin-right: 0.5vh;
        `
        
        return (
            <LogoButton><LogoImg src={process.env.PUBLIC_URL + "/images/" + url} alt=""/></LogoButton>
        )
    }
    const companys = [["brother_logo.png", "white"], ["coupang_logo.png", "black"], ["d2_logo.gif", "white"], ["kakao_logo.jpg", "black"],
     ["line_logo.png", "black"], ["sds_logo.png"], ["spoqa_logo.png"], ["tmon_logo.png"], ["toast_logo.png"], ["yanolja_logo.png", "black"]]
    return (
        <div>
            {companys.map(one => logo(one[0], "auto", "2vh", one[1]))}
        </div>
    )
}

export default CompanyLogos;