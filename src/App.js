import React, {Component} from 'react';

const url = 'http://193.191.177.8:10308/ip-rest/rest/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }


    componentDidMount() {
        setInterval(() =>
            fetch(url + 'articles.htm')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        articles: data
                    });
                }), 150);
    }

    static send() {
        if(document.getElementById("title").value !== "" || document.getElementById("content").value !== "")
            document.getElementById("id").value === "" ? App.add() : App.edit();
    }

    static add() {
        const json = {"title": document.getElementById("title").value, "content": document.getElementById("content").value};

        fetch(url + 'add.htm', {
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }

    static edit() {
        const json = {  "id": document.getElementById("id").value,
                        "title": document.getElementById("title").value,
                        "content": document.getElementById("content").value};

        fetch(url + 'edit.htm', {
            method: "put",
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.getElementById("id").value = "";
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }

    static get(id){
        fetch(url + 'getArticle/'+id+'.htm')
            .then(response => response.json())
            .then(data => {
                document.getElementById("id").value = data.id;
                document.getElementById("title").value = data.title;
                document.getElementById("content").value = data.content;
            });
    }

    static remove(id) {
        fetch(url + 'delete/'+id+'.htm', {
            method: 'DELETE'
        })
    }

    render() {
        //const articles = this.state.articles
        //onClick needs to have an arrow function to call remove method otherwise onClick will be called every time the page renders
        const {articles} = this.state;

        return (
            <div>
                <div>
                    <input id="id" type="hidden"/>
                    <input id="title" type="text"/>
                    <input id="content" type="text"/>
                    <button onClick={() => App.send()}>add</button>
                </div>
                <div>
                    <div>Books!</div>
                    <table>
                        <tbody>
                        {
                            articles.map((article, index) => (
                                <tr key={index}>
                                    <td key={article.id}>{article.id}</td>
                                    <td key={article.title}>{article.title}</td>
                                    <td key={article.content}>{article.content}</td>
                                    <td><a onClick={() => App.remove(article.id)}>delete</a></td>
                                    <td><a onClick={() => App.get(article.id)}>edit</a></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
