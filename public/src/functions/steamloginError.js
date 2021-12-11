async function steamloginError(errorData, response) {
    const
        {generateId} = require('./generateId'),
	    {webhookSendError} = require('./webhookSendError'),
        generatedId = generateId(12),
        errorSchema = require("../db/schemas/errorSchema");
    await errorSchema.findOneAndUpdate({_id: generatedId}, {_id: generatedId, response: errorData}, {upsert:true})
    await webhookSendError(errorData, generatedId)
    return response.redirect(`error?error_code=${generatedId}`);
}

module.exports = {steamloginError}