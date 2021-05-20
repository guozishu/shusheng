const assert = require('assert')

describe('@render header', function() {
  before(async function() {
    // base url http://localhost:3000 
    await this.nemo.driver.get(`${this.nemo.data.baseUrl}/`)
  })

  afterEach(async function() {
    await this.nemo.driver.sleep(15000)
  })

  it('add number', async function() {
    const nemo = this.nemo
    await nemo.view.homePageUI.hoverButton().sendKeys('sadfasdfasdf')
    await nemo.driver.sleep(12000)
  })

})
