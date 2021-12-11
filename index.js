require("dotenv").config();

const 
	{steamloginError} = require("./public/src/functions/steamloginError"),
	fetch = require('node-fetch'),
	express = require('express'),
	db = require("./public/src/db/db"),
	path = require('path'),
	app = express()

app.get('/steamlogin/', async ({ query }, response) => {
	response.sendFile('index.html', { root: './public/src/html/steamlogin/' });
});

app.get('/steamlogin/success', async ({ query }, response) => {
	const { code } = query
		
	if (code) {
		try {
			var 
				oauthResult = await fetch('https://discord.com/api/oauth2/token', {
					method: 'POST',
					body: new URLSearchParams({
						client_id: "762077336812126228",
						client_secret: process.env.avb,
						code,
						grant_type: 'authorization_code',
						redirect_uri: `https://tockanest.com:2096/steamlogin/success`,
						scope: 'identify%20connections',
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				})
			if(oauthResult.status === 200) {
				const
					oauthData = await oauthResult.json();
					accountsResult = await fetch('https://discord.com/api/users/@me/connections', { headers: { authorization: `${oauthData.token_type} ${oauthData.access_token}`} }),
					userQuery = await fetch('https://discord.com/api/users/@me', { headers: { authorization: `${oauthData.token_type} ${oauthData.access_token}`}}),
					accountsData = await accountsResult.json(),
					userData = await userQuery.json(),
					steamQuery = await steamSchema.findOne({_id: userData.id})
				if(!steamQuery) {
					const 
						steamAccount = accountsData.find(account => account.type === 'steam')
					if(!steamAccount) {
						return response.redirect('nolinkedsteam');
					} else {
						const steamId = steamAccount.id;
						await steamSchema.findOneAndUpdate({_id: userData.id}, {_id:userData.id, steamId: steamId}, {upsert:true})
					}
				} else {
					return response.redirect('alreadylinked');
				}
			} else  {
				const errorData = [{"date":`${new Date()}`,"status_code":`${oauthResult.status}`,"status_text":`${oauthResult.statusText}`,"result_json":`${JSON.stringify(await oauthResult.json())}`}]
				await steamloginError(errorData, response)
            }
			return response.sendFile('success.html', { root: './public/src/html/steamlogin/' })
		} catch (error) { 
			console.log(error)
			// await steamloginError(oauthResult, response)
		}
	}
});

app.get("/steamlogin/alreadylinked", ({ query }, response) => { response.sendFile('alreadyLinked.html', { root: './public/src/html/steamlogin/' }) })
app.get("/steamlogin/nolinkedsteam", ({ query }, response) => { response.sendFile('nolinkedsteam.html', { root: './public/src/html/steamlogin/' }) })
app.get("/steamlogin/error", ({ query }, response) => { response.sendFile('error.html', { root: './public/src/html/steamlogin/' }) })
//app.get("/api/discordint", ({query}, response) => {console.log(response)} )
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8086, async() => {
	await db.then(console.log("DB connected"))
	console.log("Server started");
});
