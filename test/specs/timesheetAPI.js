import axios from 'axios'
import { expect } from 'chai'
// import { qs } from 'querystring'
const qs = require('qs')


describe('Timesheet Methods', async () => {
    it('POST /supervise/timesheet/start', async () => {
        const startUrl = `${process.env.BASE_URL}/api/v1/supervise/timesheet/start`

        const body = {
            'intEmployeeId': 460,
            'intOpunitId': 11
        }
        const header = {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: process.env.TOKEN
        }

        const request = {
            method: 'POST',
            url: startUrl,
            headers: header,
            data: JSON.stringify(body)
        }

        var response
        try {
            response = await axios(request)
            console.log(response.status)
            console.log(response.data.Id)
        } catch (error) {
            console.log('Server Error : ', error.response.data)
        }


    })
})