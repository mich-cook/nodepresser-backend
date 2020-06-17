# fallen-tree blogging software

Replaces old paper (made via fallen trees) news distribution.

Originally a demo tutorial project (lynda / linkedin learning, I think) that just had a few blog pages for a single user.

This work will expand it to a multi-tenant blogging platform (like many others that I didn't write). I've also hooked it up to a functional data store (mongodb) instead of a flat demo file that was only readable if I recall correctly.

## Frontend Access:
### Current:
    /
    /about
    /articles/<author>
    /article/<author>/<slug>
### Planned:
    /articles/recent
    /articles/popular
    /article/editor

## Backend APIs:
### Read APIs:
    GET /api/articles/<author>

Returns articles by author. Currently no limit, specific sort order, and currently not filtering deleted articles.

    GET /api/article/<author>/<slug>
Returns article with slug written by specified author. Slugs must be unique per author.  
Design requirement: multiple authors can have the same slug (like hello-world).

### Author APIs (All require authentication (TODO)):
    POST  /api/articles
Creates an article for an author.

    POST /api/article/<id>
Update an article.

    DELETE /api/article/<id>
Mark article as deleted. Cannot be reverted by author.
Author still will be able to see article in editor, but other users cannot see it.

### User APIs (All require authentication (TODO)):
    POST /api/article/<id>/upvote
Add vote to article

    POST /api/article/<id>/add-comment
Add comment to article
