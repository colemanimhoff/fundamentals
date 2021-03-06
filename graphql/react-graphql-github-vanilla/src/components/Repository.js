import React from 'react';
import { Button } from 'react-bootstrap';

export const Repository = ({
    repository,
    onFetchMoreIssues,
    onStarRepository
}) => {
    return (
        <div>
            <p>
                <strong>In Repository: </strong>
                <a href={repository.url}>{repository.name}</a>
            </p>
            <Button
            type="button"
            onClick={() => onStarRepository(repository.id, repository.viewerHasStarred)}
            >
              {repository.stargazers.totalCount + ' '}
              {repository.viewerHasStarred ? 'Unstar' : 'Star'}
            </Button>
            <ul>
                {repository.issues.edges.map(issue => (
                    <li key={issue.node.id}>
                        <a href={issue.node.url}>{issue.node.title}</a>
                        <ul>
                            {issue.node.reactions.edges.map(reaction => (
                                <li key={reaction.node.id}>{reaction.node.content}</li>))}
                        </ul>
                    </li>
                ))}
            </ul>
            <br />
            {repository.issues.pageInfo.hasNextPage && (
                <Button onClick={onFetchMoreIssues}>More</Button>
            )}
        </div>
    );
};