describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const header = await page.$eval('header > h1', (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const entry = await page.$('entry-page');
    const data = await (await entry.getProperty('entry')).jsonValue();
    expect(data.title).toBe('You like jazz?');
    expect(data.date).toBe('4/25/2021');
    expect(data.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(data.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(data.image.alt).toBe('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const entry = await page.$eval('body', (e) => {
      return e.classList;
    });
    expect(entry[0]).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.$eval('header > h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const settings = await page.$eval('body', (s) => {
      return s.classList;
    });
    expect(settings[0]).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    const header = await page.$eval('header > h1', (h) => {
      return h.innerHTML;
    });
    expect(header).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    const num = await page.$eval('body', (l) => {
      return l.classList.length;
    });
    expect(num).toBe(0);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    const secondEntry = await page.$$('journal-entry');
    await secondEntry[1].click();
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const header = await page.$eval('header > h1', (h) => {
      return h.innerHTML;
    });
    expect(header).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    const entry = await page.$('entry-page');
    const data = await (await entry.getProperty('entry')).jsonValue();
    expect(data.title).toBe('Run, Forrest! Run!');
    expect(data.date).toBe('4/26/2021');
    expect(data.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(data.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(data.image.alt).toBe('forrest running');
    expect(data.audio).toBeUndefined();
  });

  // create your own test 17
  it('Test17: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the third entry', async() => {
    const thirdEntry = await page.$$('journal-entry');
    await thirdEntry[2].click();
    const url = await page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry3');
  });

  // create your own test 19
  it('Test19: Verify the title is current when clicking on the third entry', async () => {
    const header = await page.$eval('header > h1', (h) => {
      return h.innerHTML;
    });
    expect(header).toBe('Entry 3');
  });

  // create your own test 20
  it('Test20: Verify the entry page contents is correct when clicking on the third entry', async() => {
    const entry = await page.$('entry-page');
    const data = await (await entry.getProperty('entry')).jsonValue();
    expect(data.title).toBe('Ogres are like onions');
    expect(data.date).toBe('4/27/2021');
    expect(data.content).toBe('Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.');
    expect(data.image.src).toBe('https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg');
    expect(data.image.alt).toBe('shrek and donkey looking confused');
    expect(data.audio).toBeUndefined();
  });
});
