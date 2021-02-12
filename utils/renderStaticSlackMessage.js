module.exports = (url, name) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Vaccines are available from ${name}! 💉 @channel*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Click here to schedule:',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: `Schedule at ${name}`,
            emoji: true,
          },
          value: 'vaccine',
          url,
          action_id: 'button-action',
        },
      },
    ],
  };
};
