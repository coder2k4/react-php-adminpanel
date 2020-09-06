import React, {useEffect, useState} from 'react';
import axios from "axios";

//Iframe Loader Helper
import "../../libs/iframeLoader.js"

const Editor = () => {

    const path = './html-pages/'

    const [pageList, setPageList] = useState([])
    const [page, setPage] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(path + 'index.html')
    let iframe

    const loadPageList = () => {
        axios.get("./api").then(res => setPageList(res.data))
    }

    const createNewPage = () => {
        axios.post("./api/createNewPage.php", {"name": page}).then(loadPageList).catch(() => alert("Старница уже существует"))
    }

    const deletePage = (page) => {
        axios.post("./api/deletePage.php", {"name": page}).then(loadPageList).catch(() => alert("Станица не найдена"))
    }

    useEffect(() => {
        init(currentPage)
        setLoading(false)
    }, [])


    const init = (page) => {
        iframe = document.querySelector('iframe')
        open(page)
        loadPageList()
    }

    const open = (page) => {
        iframe.load(page, () => {
            const body = iframe.contentDocument.body;
            let textNodes = [];

            console.log(body.childNodes)

            function recursyBody(element) {
                element.childNodes.forEach(node => {
                    if (node.nodeName === "#text" && node.trim.length !== 0)
                        console.log(node)
                    else
                        recursyBody(node)
                })
            }

            recursyBody(body)

            // function recursy(element) {
            //     element.childNodes.forEach(node => {
            //         console.log(node)
            //     })
            // }
            // recursy(body)
        })
    }

    return (
        <iframe src={currentPage} frameBorder="0"/>
    );
};

export default Editor;