import trending from '../assets/trending.json';
import { RAPID_API_KEY } from "@env";

import axios from 'axios'


export interface TrendingMeme {
    title: string;
    url: string;
    created_utc: number
}
export interface Meme {
    name: string;
    image: any;
}

export const useApi = () => {
    const getTrending = async (): Promise<TrendingMeme[]> => {
        // use the below for development-process so as not to blow up limited api quota
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(trending)
        //     }, 1000);
        // });

        const result = await axios.get("https://reddit-meme.p.rapidapi.com/memes/trending", {
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
            }
        });
        console.log(result);
        return result.data;
    }
    return { getTrending };
}


//  from this learn to make the API calls as close to reality while coding
//  so that not much changes are made in prod