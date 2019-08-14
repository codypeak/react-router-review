import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamsArticles } from '../api';
import Article from './Article';
import Loading from './Loading';

export default class Articles extends Component {
    state = {
        loading: true,
        teamsArticles: []
    }

    //when set up route need to url parameters in order for match.params to work 
    //when promise is resolved will return teamsArticles that can be passed in to set state
    componentDidMount() {
        getTeamsArticles(this.props.match.params.teamId)
            .then((teamsArticles) => {
                this.setState(() => ({
                    loading: false,
                    teamsArticles: teamsArticles.map((article) => article.title)
                }))
            })
    }
    
    render() {
        const { loading, teamsArticles } = this.state
        const { params, url } = this.props.match
        const { teamId, articleId } = params

        return loading === true
            ? <Loading />
            : <div className='container two-column'>
                <Sidebar 
                    loading={loading}
                    title='Articles'
                    list={teamsArticles}
                    {...this.props}  //passing router props down to sidebar
                />

            <Route path={`${url}/:articleId`} render={({ match }) => (
                <Article articleId={match.params.articleId} teamId={teamId}>  
                    {(article) => !article ? <Loading /> : (
                        <div className='panel'>
                            <article className='article' key={article.id}>
                                <h1 className='header'>{article.title}</h1>
                                <p>{article.body}</p>
                            </article> 
                        </div>
                    )}
                </Article>  //once both id's passed in can invoke article function.
            )} />
            </div>
        
    }
}