import queries from './queries';
import mutations from './mutations';
import gql from 'graphql-tag';

const convert = tags => Object.keys(tags).forEach(key => tags[key] = gql(tags[key]));
convert(queries);
convert(mutations);

export default {
    queries,
    mutations,
    gql
}