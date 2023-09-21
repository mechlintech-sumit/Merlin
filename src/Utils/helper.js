export const convertdata = (results, showEvendata) => {
  let contactId = [];

  let response = [];

  results?.contacts_ids?.forEach((res) => {
    if (!contactId.includes(res)) {
      contactId.push(res);
    }
  });

  const contactIdsToUse = showEvendata
    ? contactId.filter((id) => id % 2 === 0)
    : contactId;

  for (let i = 0; i < contactIdsToUse.length; i++) {
    let cont = results.contacts[contactIdsToUse[i]];
    let obj = {
      id: cont.app_contact_ids[0],
      name: cont?.first_name,
      email: cont?.email,
      number: cont?.phone_number,
      origin: cont?.country?.iso,
      total: cont?.total,
    };
    response.push(obj);
  }
  return response;
};
