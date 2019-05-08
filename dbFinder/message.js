exports.messageFilter = (messagesFrmDb) => {

    var SingleMessage = {
        message: '',
        sentAt: '',
        receiver: '',
        sent: true
    }

    var messagesList = []

    for (let message of messagesFrmDb) {

        SingleMessage.message = message.message;
        SingleMessage.receiver = message.receiver
        sentAt = message.sentAt
        messagesList.push(SingleMessage)
    }
    return messagesList;
}