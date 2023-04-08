
const getContactByAddress = async (address) => {
    //пробуем обратиться к мэпингу контракта contactFactory, чтобы узнать адрес
    //контракта Contact, в аргументе указав EOA address, который прописываем в input
    const contactAddress = await contactFactory.ownerToContact(address);
    //если по такому адресу EOA нет записей, то выводим ошибку
    if(contactAddress === "0x0000000000000000000000000000000000000000") {
        //выбросить новую ошибку и выполнение функции прервется
        throw new Error("Такой контакт не найден!")
    }
    console.log("contactAddress:", contactAddress);n

    //обращаеаемся к контракту типа Contact, передав туда полученный адресс
    const contact = Contact(contactAddress);

    //достаем оттуда значение телегерам
    const telegram = await contact.telegram();
    console.log("telegram :", telegram);

    //достаем оттуда значение дискорд
    const discord = await contact.discord();
    console.log("discord :", discord);

    //достаем оттуда значение деск
    const desc = await contact.desc();
    console.log("desc :", desc);

    //возвращаем значения 
    return { telegram, discord, desc }
};
export default getContactByAddress;