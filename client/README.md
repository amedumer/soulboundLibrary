# 📚 Instant Books Search, powered by Typesense

This is a demo that showcases some of [Typesense's](https://github.com/typesense/typesense) features using a 28 Million database of books from <a href="https://openlibrary.org/" target="_blank">OpenLibrary</a> (Internet Archive).

View it live here: [books-search.typesense.org](https://books-search.typesense.org/)

## Tech Stack

This search experience is powered by <a href="https://typesense.org" target="_blank">Typesense</a> which is
a blazing-fast, <a href="https://github.com/typesense/typesense" target="_blank">open source</a> typo-tolerant
search-engine. It is an open source alternative to Algolia and an easier-to-use alternative to ElasticSearch.

The book dataset is from <a href="https://openlibrary.org/" target="_blank">openlibrary.org</a>. If you're able to contribute
book metadata, please do 🙏

The app was built using the <a href="https://github.com/typesense/typesense-instantsearch-adapter" target="_blank">
Typesense Adapter for InstantSearch.js</a> and is hosted on S3, with CloudFront for a CDN.

The search backend is powered by a geo-distributed 3-node Typesense cluster running on <a href="https://cloud.typesense.org" target="_blank">Typesense Cloud</a>,
with nodes in Oregon, Frankfurt and Mumbai.

The dataset has ~28M records, takes up 6.8GB on disk and 14.3GB in RAM when indexed in Typesense.
Takes ~3 hours to index these 28M records.

## Repo structure

- `src/` and `index.html` - contain the frontend UI components, built with <a href="https://github.com/typesense/typesense-instantsearch-adapter" target="_blank">Typesense Adapter for InstantSearch.js</a>
- `scripts/indexer` - contains the script to index the book data into Typesense.
- `scripts/data` - contains a 1K sample subset of the books database. But you can download the full dataset from the link above.

## Development

To run this project locally, install the dependencies and run the local server:

```shell
yarn
bundle # JSON parsing takes a while to run using JS when indexing, so we're using Ruby just for indexing

yarn run typesenseServer

ln -s .env.development .env

yarn run indexer:extractAuthors # This will output an authors.jsonl file
yarn run indexer:transformDataset # This will output a transformed_dataset.json file
BATCH_SIZE=100000 yarn run indexer:importToTypesense # This will import the JSONL file into Typesense

yarn start
```

Open http://localhost:3000 to see the app.

## Deployment

The app is hosted on S3, with Cloudfront for a CDN.

```shell
yarn build
yarn deploy
```
