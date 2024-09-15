const express = require('express');
const fs = require('fs');
const { createJMX } = require('./sudoJMX.js');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 4000;


app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // กำหนดไดเรกทอรีสำหรับเก็บไฟล์
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์
    }
});
const upload = multer({ storage: storage });

app.post('/api/file', upload.single('file'), (req, res) => {
    console.log('File details:', req.file); // ข้อมูลไฟล์
    console.log('Body:', req.body); // ข้อมูลอื่นๆ

    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    res.status(200).send({ message: 'File uploaded successfully' });
});



    // const {url, user, duration, ramp} = req.body
    // try {
    //     const checkUrl = new URL(url);

    //     // Extract components 
    //     let protocol = checkUrl.protocol;  // "http:" or "https:"
    //     let hostname = checkUrl.hostname;  // "localhost"
    //     let port = checkUrl.port;          // e.g., "3000"

    //     // Adjust protocol
    //     protocol = protocol === "https:" ? "https" : "http";

    //     // Adjust port if missing
    //     if (!port && hostname !== "localhost") {
    //         port = protocol === "https" ? "443" : "80";
    //     }

    //     createJMX(protocol, hostname, port , user, duration, ramp)

    //     res.status(200).send({ protocol, hostname, port }); // Example response

    // } catch (error) {
    //     // Handle errors
    //     console.error('Error processing URL:', error);
    //     res.status(400).send({ error: 'Invalid URL' });
    // }








app.get('/test', (req, res) => {
    const subProcess = require('child_process')
    subProcess.exec('jmeter -n -t example_test_plan.jmx -l result.jtl', (err, stdout, stderr) => {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
        console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
    }
    })
    res.send("Done create csv");
});
// app.get('/result', (req, res) => {
//     const subProcess = require('child_process')
//     subProcess.exec('jmeter -g ./result.jtl -o jtl ', (err, stdout, stderr) => {
//     if (err) {
//         console.error(err)
//         process.exit(1)
//     } else {
//         console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
//         console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
//     }
//     })
//     res.send("Done create html");
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});