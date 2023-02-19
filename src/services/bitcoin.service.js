import axios from "axios";
import { storageService } from './storage.service'

export const bitcoinService = {
  getRate,
  getMarketPriceHistory,
  getAvgBlockSize,
}

async function getRate() {
  try {
    let rate = storageService.loadFromStorage('rate')
    if (rate) {
      return rate
    }
    rate = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    rate = rate.data
    storageService.saveToStorage('rate', rate)
    return rate

  }
  catch (error) {
    console.log('error:', error);
  }
}

async function getAvgBlockSize() {
  try {
    let avg = storageService.loadFromStorage('avg')
    if (avg) {
      console.log('avg from CACHE')
      return avg
    }

    avg = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
    avg = avg.data.values
    storageService.saveToStorage('avg', avg)
    return avg
  }
  catch (error) {
    console.log('error:', error);
  }
}

async function getMarketPriceHistory() {
  try {
    let marketPriceHistory = storageService.loadFromStorage('marketPriceHistory')
    if (marketPriceHistory) {
      console.log('bitcion from CACHE')
      return marketPriceHistory
    }
    marketPriceHistory = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    marketPriceHistory = marketPriceHistory.data.values
    storageService.saveToStorage('marketPriceHistory', marketPriceHistory)
    return marketPriceHistory
  }
  catch (error) {
    console.log('error:', error);
  }
}

