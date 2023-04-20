const Helper = require('@codeceptjs/helper')

class CatchRequestsHelper extends Helper {
  static readonly allRequests = [];
  async catchRequests( urlFilter:RegExp) {
    const { page } = this.helpers.Playwright;
    await this.clearnRequests()
    try {
      // await page.setRequestInterception(true);  // not working with Playwright
      page.on('request', async (request) => {
        if(urlFilter && urlFilter.test(request.url()) === false) {
          return;
        }
        const info = {
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
          headers: request.headers(),
        }
        console.log(888, request.url());
        CatchRequestsHelper.allRequests.push(info)
        // request.continue() // not working with Playwright
      })
    } catch (e) {}
    return CatchRequestsHelper.allRequests
  }

  async clearnRequests() {
    //  Clear all requests
    CatchRequestsHelper.allRequests.length = 0;
    const { page } = this.helpers.Playwright;
    // page.removeAllListeners('request')
  }

  async hasRequest(url: string): Promise<boolean> {
    const matches = CatchRequestsHelper.allRequests.filter((request) => {
      return request.url.includes(url)
    })
    return matches.length > 0
  }
}

export = CatchRequestsHelper
