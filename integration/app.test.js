describe('taskForm', ()=>{
    it('taskForm, visually looks correct', async() =>{
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-not-done-example&viewMode=story')
        const image = await page.screenshot()

        //Api from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})


describe('addItemForm', () => {
    it('addItemForm, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})