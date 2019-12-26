'use strict'

/*
|--------------------------------------------------------------------------
| ProvinceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ProvinceSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
		await Database.truncate('provinces')
		const provinces = await Database
		.table('provinces')
		.insert([
			{state_id:1,province_label:"Aba North"},
      {state_id:1,province_label:"Aba South"},
      {state_id:1,province_label:"Arochukwu"},
      {state_id:1,province_label:"Bende"},
      {state_id:1,province_label:"Ikwuano"},
      {state_id:1,province_label:"Isiala-Ngwa North"},
      {state_id:1,province_label:"Isiala-Ngwa South"},
      {state_id:1,province_label:"Isuikwato"},
      {state_id:1,province_label:"Obi Nwa"},
      {state_id:1,province_label:"Ohafia"},
      {state_id:1,province_label:"Osisioma"},
      {state_id:1,province_label:"Ngwa"},
      {state_id:1,province_label:"Ugwunagbo"},
      {state_id:1,province_label:"Ukwa East"},
      {state_id:1,province_label:"Ukwa West"},
      {state_id:1,province_label:"Umuahia North"},
      {state_id:1,province_label:"Umuahia South"},
      {state_id:1,province_label:"Umu-Neochi"},
      {state_id:2,province_label:"Demsa"},
      {state_id:2,province_label:"Fufore"},
      {state_id:2,province_label:"Ganaye"},
      {state_id:2,province_label:"Gireri"},
      {state_id:2,province_label:"Gombi"},
      {state_id:2,province_label:"Guyuk"},
      {state_id:2,province_label:"Hong"},
      {state_id:2,province_label:"Jada"},
      {state_id:2,province_label:"Lamurde"},
      {state_id:2,province_label:"Madagali"},
      {state_id:2,province_label:"Maiha"},
      {state_id:2,province_label:"Mayo-Belwa"},
      {state_id:2,province_label:"Michika"},
      {state_id:2,province_label:"Mubi North"},
      {state_id:2,province_label:"Mubi South"},
      {state_id:2,province_label:"Numan"},
      {state_id:2,province_label:"Shelleng"},
      {state_id:2,province_label:"Song"},
      {state_id:2,province_label:"Toungo"},
      {state_id:2,province_label:"Yola North"},
      {state_id:2,province_label:"Yola South"},
      {state_id:3,province_label:"Abak"},
      {state_id:3,province_label:"Eastern Obolo"},
      {state_id:3,province_label:"Eket"},
      {state_id:3,province_label:"Esit Eket"},
      {state_id:3,province_label:"Essien Udim"},
      {state_id:3,province_label:"Etim Ekpo"},
      {state_id:3,province_label:"Etinan"},
      {state_id:3,province_label:"Ibeno"},
      {state_id:3,province_label:"Ibesikpo Asutan"},
      {state_id:3,province_label:"Ibiono Ibom"},
      {state_id:3,province_label:"Ika"},
      {state_id:3,province_label:"Ikono"},
      {state_id:3,province_label:"Ikot Abasi"},
      {state_id:3,province_label:"Ikot Ekpene"},
      {state_id:3,province_label:"Ini"},
      {state_id:3,province_label:"Itu"},
      {state_id:3,province_label:"Mbo"},
      {state_id:3,province_label:"Mkpat Enin"},
      {state_id:3,province_label:"Nsit Atai"},
      {state_id:3,province_label:"Nsit Ibom"},
      {state_id:3,province_label:"Nsit Ubium"},
      {state_id:3,province_label:"Obot Akara"},
      {state_id:3,province_label:"Okobo"},
      {state_id:3,province_label:"Onna"},
      {state_id:3,province_label:"Oron"},
      {state_id:3,province_label:"Oruk Anam"},
      {state_id:3,province_label:"Udung Uko"},
      {state_id:3,province_label:"Ukanafun"},
      {state_id:3,province_label:"Uruan"},
      {state_id:3,province_label:"Urue-Offong/Oruko "},
      {state_id:3,province_label:"Uyo"},
      {state_id:4,province_label:"Aguata"},
      {state_id:4,province_label:"Anambra East"},
      {state_id:4,province_label:"Anambra West"},
      {state_id:4,province_label:"Anaocha"},
      {state_id:4,province_label:"Awka North"},
      {state_id:4,province_label:"Awka South"},
      {state_id:4,province_label:"Ayamelum"},
      {state_id:4,province_label:"Dunukofia"},
      {state_id:4,province_label:"Ekwusigo"},
      {state_id:4,province_label:"Idemili North"},
      {state_id:4,province_label:"Idemili south"},
      {state_id:4,province_label:"Ihiala"},
      {state_id:4,province_label:"Njikoka"},
      {state_id:4,province_label:"Nnewi North"},
      {state_id:4,province_label:"Nnewi South"},
      {state_id:4,province_label:"Ogbaru"},
      {state_id:4,province_label:"Onitsha North"},
      {state_id:4,province_label:"Onitsha South"},
      {state_id:4,province_label:"Orumba North"},
      {state_id:4,province_label:"Orumba South"},
      {state_id:4,province_label:"Oyi"},
      {state_id:5,province_label:"Alkaleri"},
      {state_id:5,province_label:"Bauchi"},
      {state_id:5,province_label:"Bogoro"},
      {state_id:5,province_label:"Damban"},
      {state_id:5,province_label:"Darazo"},
      {state_id:5,province_label:"Dass"},
      {state_id:5,province_label:"Ganjuwa"},
      {state_id:5,province_label:"Giade"},
      {state_id:5,province_label:"Itas/Gadau"},
      {state_id:5,province_label:"Jama'are"},
      {state_id:5,province_label:"Katagum"},
      {state_id:5,province_label:"Kirfi"},
      {state_id:5,province_label:"Misau"},
      {state_id:5,province_label:"Ningi"},
      {state_id:5,province_label:"Shira"},
      {state_id:5,province_label:"Tafawa-Balewa"},
      {state_id:5,province_label:"Toro"},
      {state_id:5,province_label:"Warji"},
      {state_id:5,province_label:"Zaki"},
      {state_id:6,province_label:"Brass"},
      {state_id:6,province_label:"Ekeremor"},
      {state_id:6,province_label:"Kolokuma/Opokuma"},
      {state_id:6,province_label:"Nembe"},
      {state_id:6,province_label:"Ogbia"},
      {state_id:6,province_label:"Sagbama"},
      {state_id:6,province_label:"Southern Jaw"},
      {state_id:6,province_label:"Yenegoa"},
      {state_id:7,province_label:"Ado"},
      {state_id:7,province_label:"Agatu"},
      {state_id:7,province_label:"Apa"},
      {state_id:7,province_label:"Buruku"},
      {state_id:7,province_label:"Gboko"},
      {state_id:7,province_label:"Guma"},
      {state_id:7,province_label:"Gwer East"},
      {state_id:7,province_label:"Gwer West"},
      {state_id:7,province_label:"Katsina-Ala"},
      {state_id:7,province_label:"Konshisha"},
      {state_id:7,province_label:"Kwande"},
      {state_id:7,province_label:"Logo"},
      {state_id:7,province_label:"Makurdi"},
      {state_id:7,province_label:"Obi"},
      {state_id:7,province_label:"Ogbadibo"},
      {state_id:7,province_label:"Oju"},
      {state_id:7,province_label:"Okpokwu"},
      {state_id:7,province_label:"Ohimini"},
      {state_id:7,province_label:"Oturkpo"},
      {state_id:7,province_label:"Tarka"},
      {state_id:7,province_label:"Ukum"},
      {state_id:7,province_label:"Ushongo"},
      {state_id:7,province_label:"Vandeikya"},
      {state_id:8,province_label:"Abadam"},
      {state_id:8,province_label:"Askira/Uba"},
      {state_id:8,province_label:"Bama"},
      {state_id:8,province_label:"Bayo"},
      {state_id:8,province_label:"Biu"},
      {state_id:8,province_label:"Chibok"},
      {state_id:8,province_label:"Damboa"},
      {state_id:8,province_label:"Dikwa"},
      {state_id:8,province_label:"Gubio"},
      {state_id:8,province_label:"Guzamala"},
      {state_id:8,province_label:"Gwoza"},
      {state_id:8,province_label:"Hawul"},
      {state_id:8,province_label:"Jere"},
      {state_id:8,province_label:"Kaga"},
      {state_id:8,province_label:"Kala/Balge"},
      {state_id:8,province_label:"Konduga"},
      {state_id:8,province_label:"Kukawa"},
      {state_id:8,province_label:"Kwaya Kusar"},
      {state_id:8,province_label:"Mafa"},
      {state_id:8,province_label:"Magumeri"},
      {state_id:8,province_label:"Maiduguri"},
      {state_id:8,province_label:"Marte"},
      {state_id:8,province_label:"Mobbar"},
      {state_id:8,province_label:"Monguno"},
      {state_id:8,province_label:"Ngala"},
      {state_id:8,province_label:"Nganzai"},
      {state_id:8,province_label:"Shani"},
      {state_id:9,province_label:"Akpabuyo"},
      {state_id:9,province_label:"Odukpani"},
      {state_id:9,province_label:"Akamkpa"},
      {state_id:9,province_label:"Biase"},
      {state_id:9,province_label:"Abi"},
      {state_id:9,province_label:"Ikom"},
      {state_id:9,province_label:"Yarkur"},
      {state_id:9,province_label:"Odubra"},
      {state_id:9,province_label:"Boki"},
      {state_id:9,province_label:"Ogoja"},
      {state_id:9,province_label:"Yala"},
      {state_id:9,province_label:"Obanliku"},
      {state_id:9,province_label:"Obudu"},
      {state_id:9,province_label:"Calabar South"},
      {state_id:9,province_label:"Etung"},
      {state_id:9,province_label:"Bekwara"},
      {state_id:9,province_label:"Bakassi"},
      {state_id:9,province_label:"Calabar Municipality"},
      {state_id:10,province_label:"Oshimili"},
      {state_id:10,province_label:"Aniocha"},
      {state_id:10,province_label:"Aniocha South"},
      {state_id:10,province_label:"Ika South"},
      {state_id:10,province_label:"Ika North-East"},
      {state_id:10,province_label:"Ndokwa West"},
      {state_id:10,province_label:"Ndokwa East"},
      {state_id:10,province_label:"Isoko south"},
      {state_id:10,province_label:"Isoko North"},
      {state_id:10,province_label:"Bomadi"},
      {state_id:10,province_label:"Burutu"},
      {state_id:10,province_label:"Ughelli South"},
      {state_id:10,province_label:"Ughelli North"},
      {state_id:10,province_label:"Ethiope West"},
      {state_id:10,province_label:"Ethiope East"},
      {state_id:10,province_label:"Sapele"},
      {state_id:10,province_label:"Okpe"},
      {state_id:10,province_label:"Warri North"},
      {state_id:10,province_label:"Warri South"},
      {state_id:10,province_label:"Uvwie"},
      {state_id:10,province_label:"Udu"},
      {state_id:10,province_label:"Warri Central"},
      {state_id:10,province_label:"Ukwani"},
      {state_id:10,province_label:"Oshimili North"},
      {state_id:10,province_label:"Patani"},
      {state_id:11,province_label:"Afikpo South"},
      {state_id:11,province_label:"Afikpo North"},
      {state_id:11,province_label:"Onicha"},
      {state_id:11,province_label:"Ohaozara"},
      {state_id:11,province_label:"Abakaliki"},
      {state_id:11,province_label:"Ishielu"},
      {state_id:11,province_label:"lkwo"},
      {state_id:11,province_label:"Ezza"},
      {state_id:11,province_label:"Ezza South"},
      {state_id:11,province_label:"Ohaukwu"},
      {state_id:11,province_label:"Ebonyi"},
      {state_id:11,province_label:"Ivo"},
      {state_id:12,province_label:"Esan North-East"},
      {state_id:12,province_label:"Esan Central"},
      {state_id:12,province_label:"Esan West"},
      {state_id:12,province_label:"Egor"},
      {state_id:12,province_label:"Ukpoba"},
      {state_id:12,province_label:"Central"},
      {state_id:12,province_label:"Etsako Central"},
      {state_id:12,province_label:"Igueben"},
      {state_id:12,province_label:"Oredo"},
      {state_id:12,province_label:"Ovia SouthWest"},
      {state_id:12,province_label:"Ovia South-East"},
      {state_id:12,province_label:"Orhionwon"},
      {state_id:12,province_label:"Uhunmwonde"},
      {state_id:12,province_label:"Etsako East"},
      {state_id:12,province_label:"Esan South-East"},
      {state_id:13,province_label:"Ado"},
      {state_id:13,province_label:"Ekiti-East"},
      {state_id:13,province_label:"Ekiti-West"},
      {state_id:13,province_label:"Emure/Ise/Orun"},
      {state_id:13,province_label:"Ekiti South-West"},
      {state_id:13,province_label:"Ikare"},
      {state_id:13,province_label:"Irepodun"},
      {state_id:13,province_label:"Ijero},"},
      {state_id:13,province_label:"Ido/Osi"},
      {state_id:13,province_label:"Oye"},
      {state_id:13,province_label:"Ikole"},
      {state_id:13,province_label:"Moba"},
      {state_id:13,province_label:"Gbonyin"},
      {state_id:13,province_label:"Efon"},
      {state_id:13,province_label:"Ise/Orun"},
      {state_id:13,province_label:"Ilejemeje"},
      {state_id:14,province_label:"Enugu South"},
      {state_id:14,province_label:"Igbo-Eze South"},
      {state_id:14,province_label:"Enugu North"},
      {state_id:14,province_label:"Nkanu"},
      {state_id:14,province_label:"Udi Agwu"},
      {state_id:14,province_label:"Oji-River"},
      {state_id:14,province_label:"Ezeagu"},
      {state_id:14,province_label:"IgboEze North"},
      {state_id:14,province_label:"Isi-Uzo"},
      {state_id:14,province_label:"Nsukka"},
      {state_id:14,province_label:"Igbo-Ekiti"},
      {state_id:14,province_label:"Uzo-Uwani"},
      {state_id:14,province_label:"Enugu Eas"},
      {state_id:14,province_label:"Aninri"},
      {state_id:14,province_label:"Nkanu East"},
      {state_id:14,province_label:"Udenu"},
      {state_id:15,province_label:"Abaji"},
      {state_id:15,province_label:"Abuja Municipal"},
      {state_id:15,province_label:"Bwari"},
      {state_id:15,province_label:"Gwagwalada"},
      {state_id:15,province_label:"Kuje"},
      {state_id:15,province_label:"Kwali"},
      {state_id:16,province_label:"Akko"},
      {state_id:16,province_label:"Balanga"},
      {state_id:16,province_label:"Billiri"},
      {state_id:16,province_label:"Dukku"},
      {state_id:16,province_label:"Kaltungo"},
      {state_id:16,province_label:"Kwami"},
      {state_id:16,province_label:"Shomgom"},
      {state_id:16,province_label:"Funakaye"},
      {state_id:16,province_label:"Gombe"},
      {state_id:16,province_label:"Nafada/Bajoga"},
      {state_id:16,province_label:"Yamaltu/Delta"},
      {state_id:17,province_label:"Aboh-Mbaise"},
      {state_id:17,province_label:"Ahiazu-Mbaise"},
      {state_id:17,province_label:"Ehime-Mbano"},
      {state_id:17,province_label:"Ezinihitte"},
      {state_id:17,province_label:"Ideato North"},
      {state_id:17,province_label:"Ideato South"},
      {state_id:17,province_label:"Ihitte/Uboma"},
      {state_id:17,province_label:"Ikeduru"},
      {state_id:17,province_label:"Isiala Mbano"},
      {state_id:17,province_label:"Isu"},
      {state_id:17,province_label:"Mbaitoli"},
      {state_id:17,province_label:"Mbaitoli"},
      {state_id:17,province_label:"Ngor-Okpala"},
      {state_id:17,province_label:"Njaba"},
      {state_id:17,province_label:"Nwangele"},
      {state_id:17,province_label:"Nkwerre"},
      {state_id:17,province_label:"Obowo"},
      {state_id:17,province_label:"Oguta"},
      {state_id:17,province_label:"Ohaji/Egbema"},
      {state_id:17,province_label:"Okigwe"},
      {state_id:17,province_label:"Orlu"},
      {state_id:17,province_label:"Orsu"},
      {state_id:17,province_label:"Oru East"},
      {state_id:17,province_label:"Oru West"},
      {state_id:17,province_label:"Owerri-Municipal"},
      {state_id:17,province_label:"Owerri North"},
      {state_id:17,province_label:"Owerri West"},
      {state_id:18,province_label:"Auyo"},
      {state_id:18,province_label:"Babura"},
      {state_id:18,province_label:"Birni Kudu"},
      {state_id:18,province_label:"Biriniwa"},
      {state_id:18,province_label:"Buji"},
      {state_id:18,province_label:"Dutse"},
      {state_id:18,province_label:"Gagarawa"},
      {state_id:18,province_label:"Garki"},
      {state_id:18,province_label:"Gumel"},
      {state_id:18,province_label:"Guri"},
      {state_id:18,province_label:"Gwaram"},
      {state_id:18,province_label:"Gwiwa"},
      {state_id:18,province_label:"Hadejia"},
      {state_id:18,province_label:"Jahun"},
      {state_id:18,province_label:"Kafin Hausa"},
      {state_id:18,province_label:"Kaugama Kazaure"},
      {state_id:18,province_label:"Kiri Kasamma"},
      {state_id:18,province_label:"Kiyawa"},
      {state_id:18,province_label:"Maigatari"},
      {state_id:18,province_label:"Malam Madori"},
      {state_id:18,province_label:"Miga"},
      {state_id:18,province_label:"Ringim"},
      {state_id:18,province_label:"Roni"},
      {state_id:18,province_label:"Sule-Tankarkar"},
      {state_id:18,province_label:"Taura"},
      {state_id:18,province_label:"Yankwashi"},
      {state_id:19,province_label:"Birni-Gwari"},
      {state_id:19,province_label:"Chikun"},
      {state_id:19,province_label:"Giwa"},
      {state_id:19,province_label:"Igabi"},
      {state_id:19,province_label:"Ikara"},
      {state_id:19,province_label:"jaba"},
      {state_id:19,province_label:"Jema'a"},
      {state_id:19,province_label:"Kachia"},
      {state_id:19,province_label:"Kaduna North"},
      {state_id:19,province_label:"Kaduna South"},
      {state_id:19,province_label:"Kagarko"},
      {state_id:19,province_label:"Kajuru"},
      {state_id:19,province_label:"Kaura"},
      {state_id:19,province_label:"Kauru"},
      {state_id:19,province_label:"Kubau"},
      {state_id:19,province_label:"Kudan"},
      {state_id:19,province_label:"Lere"},
      {state_id:19,province_label:"Makarfi"},
      {state_id:19,province_label:"Sabon-Gari"},
      {state_id:19,province_label:"Sanga"},
      {state_id:19,province_label:"Soba"},
      {state_id:19,province_label:"Zango-Kataf"},
      {state_id:19,province_label:"Zaria"},
      {state_id:20,province_label:"Ajingi"},
      {state_id:20,province_label:"Albasu"},
      {state_id:20,province_label:"Bagwai"},
      {state_id:20,province_label:"Bebeji"},
      {state_id:20,province_label:"Bichi"},
      {state_id:20,province_label:"Bunkure"},
      {state_id:20,province_label:"Dala"},
      {state_id:20,province_label:"Dambatta"},
      {state_id:20,province_label:"Dawakin Kudu"},
      {state_id:20,province_label:"Dawakin Tofa"},
      {state_id:20,province_label:"Doguwa"},
      {state_id:20,province_label:"Fagge"},
      {state_id:20,province_label:"Gabasawa"},
      {state_id:20,province_label:"Garko"},
      {state_id:20,province_label:"Garum"},
      {state_id:20,province_label:"Mallam"},
      {state_id:20,province_label:"Gaya"},
      {state_id:20,province_label:"Gezawa"},
      {state_id:20,province_label:"Gwale"},
      {state_id:20,province_label:"Gwarzo"},
      {state_id:20,province_label:"Kabo"},
      {state_id:20,province_label:"Kano Municipal"},
      {state_id:20,province_label:"Karaye"},
      {state_id:20,province_label:"Kibiya"},
      {state_id:20,province_label:"Kiru"},
      {state_id:20,province_label:"kumbotso"},
      {state_id:20,province_label:"Kunchi"},
      {state_id:20,province_label:"Kura"},
      {state_id:20,province_label:"Madobi"},
      {state_id:20,province_label:"Makoda"},
      {state_id:20,province_label:"Minjibir"},
      {state_id:20,province_label:"Nasarawa"},
      {state_id:20,province_label:"Rano"},
      {state_id:20,province_label:"Rimin Gado"},
      {state_id:20,province_label:"Rogo"},
      {state_id:20,province_label:"Shanono"},
      {state_id:20,province_label:"Sumaila"},
      {state_id:20,province_label:"Takali"},
      {state_id:20,province_label:"Tarauni"},
      {state_id:20,province_label:"Tofa"},
      {state_id:20,province_label:"Tsanyawa"},
      {state_id:20,province_label:"Tudun Wada"},
      {state_id:20,province_label:"Ungogo"},
      {state_id:20,province_label:"Warawa"},
      {state_id:20,province_label:"Wudil"},
      {state_id:21,province_label:"Bakori"},
      {state_id:21,province_label:"Batagarawa"},
      {state_id:21,province_label:"Batsari"},
      {state_id:21,province_label:"Baure"},
      {state_id:21,province_label:"Bindawa"},
      {state_id:21,province_label:"Charanchi"},
      {state_id:21,province_label:"Dandume"},
      {state_id:21,province_label:"Danja"},
      {state_id:21,province_label:"Dan Musa"},
      {state_id:21,province_label:"Daura"},
      {state_id:21,province_label:"Dutsi"},
      {state_id:21,province_label:"Dutsin-Ma"},
      {state_id:21,province_label:"Faskari"},
      {state_id:21,province_label:"Funtua"},
      {state_id:21,province_label:"Ingawa"},
      {state_id:21,province_label:"Jibia"},
      {state_id:21,province_label:"Kafur"},
      {state_id:21,province_label:"Kaita"},
      {state_id:21,province_label:"Kankara"},
      {state_id:21,province_label:"Kankia"},
      {state_id:21,province_label:"Katsina"},
      {state_id:21,province_label:"Kurfi"},
      {state_id:21,province_label:"Kusada"},
      {state_id:21,province_label:"Mai'Adua"},
      {state_id:21,province_label:"Malumfashi"},
      {state_id:21,province_label:"Mani"},
      {state_id:21,province_label:"Mashi"},
      {state_id:21,province_label:"Matazuu"},
      {state_id:21,province_label:"Musawa"},
      {state_id:21,province_label:"Rimi"},
      {state_id:21,province_label:"Sabuwa"},
      {state_id:21,province_label:"Safana"},
      {state_id:21,province_label:"Sandamu"},
      {state_id:21,province_label:"Zango"},
      {state_id:22,province_label:"Aleiro"},
      {state_id:22,province_label:"Arewa-Dandi"},
      {state_id:22,province_label:"Argungu"},
      {state_id:22,province_label:"Augie"},
      {state_id:22,province_label:"Bagudo"},
      {state_id:22,province_label:"Birnin Kebbi"},
      {state_id:22,province_label:"Bunza"},
      {state_id:22,province_label:"Dandi"},
      {state_id:22,province_label:"Fakai"},
      {state_id:22,province_label:"Gwandu"},
      {state_id:22,province_label:"Jega"},
      {state_id:22,province_label:"Kalgo"},
      {state_id:22,province_label:"Koko/Besse"},
      {state_id:22,province_label:"Maiyama"},
      {state_id:22,province_label:"Ngaski"},
      {state_id:22,province_label:"Sakaba"},
      {state_id:22,province_label:"Shanga"},
      {state_id:22,province_label:"Suru"},
      {state_id:22,province_label:"Wasagu/Danko"},
      {state_id:22,province_label:"Yauri"},
      {state_id:22,province_label:"Zuru"},
      {state_id:23,province_label:"Adavi"},
      {state_id:23,province_label:"Ajaokuta"},
      {state_id:23,province_label:"Ankpa"},
      {state_id:23,province_label:"Bassa"},
      {state_id:23,province_label:"Dekina"},
      {state_id:23,province_label:"Ibaji"},
      {state_id:23,province_label:"Idah"},
      {state_id:23,province_label:"Igalamela-Odolu"},
      {state_id:23,province_label:"Ijumu"},
      {state_id:23,province_label:"Kabba/Bunu"},
      {state_id:23,province_label:"Kogi"},
      {state_id:23,province_label:"Lokoja"},
      {state_id:23,province_label:"Mopa-Muro"},
      {state_id:23,province_label:"Ofu"},
      {state_id:23,province_label:"Ogori/Mangongo"},
      {state_id:23,province_label:"Okehi"},
      {state_id:23,province_label:"Okene"},
      {state_id:23,province_label:"Olamabolo"},
      {state_id:23,province_label:"Omala"},
      {state_id:23,province_label:"Yagba East"},
      {state_id:23,province_label:"Yagba West"},
      {state_id:24,province_label:"Asa"},
      {state_id:24,province_label:"Baruten"},
      {state_id:24,province_label:"Edu"},
      {state_id:24,province_label:"Ekiti"},
      {state_id:24,province_label:"Ifelodun"},
      {state_id:24,province_label:"Ilorin East"},
      {state_id:24,province_label:"Ilorin West"},
      {state_id:24,province_label:"Irepodun"},
      {state_id:24,province_label:"Isin"},
      {state_id:24,province_label:"Kaiama"},
      {state_id:24,province_label:"Moro"},
      {state_id:24,province_label:"Offa"},
      {state_id:24,province_label:"Oke-Ero"},
      {state_id:24,province_label:"Oyun"},
      {state_id:24,province_label:"Pategi"},
      {state_id:25,province_label:"Agege"},
      {state_id:25,province_label:"Ajeromi-Ifelodun"},
      {state_id:25,province_label:"Alimosho"},
      {state_id:25,province_label:"Amuwo-Odofin"},
      {state_id:25,province_label:"Apapa"},
      {state_id:25,province_label:"Badagry"},
      {state_id:25,province_label:"Epe"},
      {state_id:25,province_label:"Eti-Osa"},
      {state_id:25,province_label:"Ibeju/Lekki"},
      {state_id:25,province_label:"Ifako-Ijaye"},
      {state_id:25,province_label:"Ikeja"},
      {state_id:25,province_label:"Ikorodu"},
      {state_id:25,province_label:"Kosofe"},
      {state_id:25,province_label:"Lagos Island"},
      {state_id:25,province_label:"Lagos Mainland"},
      {state_id:25,province_label:"Mushin"},
      {state_id:25,province_label:"Ojo"},
      {state_id:25,province_label:"Oshodi-Isolo"},
      {state_id:25,province_label:"Shomolu"},
      {state_id:25,province_label:"Surulere"},
      {state_id:26,province_label:"Akwanga"},
      {state_id:26,province_label:"Awe"},
      {state_id:26,province_label:"Doma"},
      {state_id:26,province_label:"Karu"},
      {state_id:26,province_label:"Keana"},
      {state_id:26,province_label:"Keffi"},
      {state_id:26,province_label:"Kokona"},
      {state_id:26,province_label:"Lafia"},
      {state_id:26,province_label:"Nasarawa"},
      {state_id:26,province_label:"Nasarawa-Eggon"},
      {state_id:26,province_label:"Obi"},
      {state_id:26,province_label:"Toto"},
      {state_id:26,province_label:"Wamba"},
      {state_id:27,province_label:"Agaie"},
      {state_id:27,province_label:"Agwara"},
      {state_id:27,province_label:"Bida"},
      {state_id:27,province_label:"Borgu"},
      {state_id:27,province_label:"Bosso"},
      {state_id:27,province_label:"Chanchaga"},
      {state_id:27,province_label:"Edati"},
      {state_id:27,province_label:"Gbako"},
      {state_id:27,province_label:"Gurara"},
      {state_id:27,province_label:"Katcha"},
      {state_id:27,province_label:"Kontagora"},
      {state_id:27,province_label:"Lapai"},
      {state_id:27,province_label:"Lavun"},
      {state_id:27,province_label:"Magama"},
      {state_id:27,province_label:"Mariga"},
      {state_id:27,province_label:"Mashegu"},
      {state_id:27,province_label:"Mokwa"},
      {state_id:27,province_label:"Muya"},
      {state_id:27,province_label:"Pailoro"},
      {state_id:27,province_label:"Rafi"},
      {state_id:27,province_label:"Rijau"},
      {state_id:27,province_label:"Shiroro"},
      {state_id:27,province_label:"Suleja"},
      {state_id:27,province_label:"Tafa"},
      {state_id:27,province_label:"Wushishi"},
      {state_id:28,province_label:"Abeokuta North"},
      {state_id:28,province_label:"Abeokuta South"},
      {state_id:28,province_label:"Ado-Odo/Ota"},
      {state_id:28,province_label:"Egbado North"},
      {state_id:28,province_label:"Egbado South"},
      {state_id:28,province_label:"Ewekoro"},
      {state_id:28,province_label:"Ifo"},
      {state_id:28,province_label:"Ijebu East"},
      {state_id:28,province_label:"Ijebu North"},
      {state_id:28,province_label:"Ijebu North East"},
      {state_id:28,province_label:"Ijebu Ode"},
      {state_id:28,province_label:"Ikenne"},
      {state_id:28,province_label:"Imeko-Afon"},
      {state_id:28,province_label:"Ipokia"},
      {state_id:28,province_label:"Obafemi-Owode"},
      {state_id:28,province_label:"Ogun Waterside"},
      {state_id:28,province_label:"Odeda"},
      {state_id:28,province_label:"Odogbolu"},
      {state_id:28,province_label:"Remo North"},
      {state_id:28,province_label:"Shagamu"},
      {state_id:29,province_label:"Akoko North East"},
      {state_id:29,province_label:"Akoko North West"},
      {state_id:29,province_label:"Akoko South Akure East"},
      {state_id:29,province_label:"Akoko South West"},
      {state_id:29,province_label:"Akure North"},
      {state_id:29,province_label:"Akure South"},
      {state_id:29,province_label:"Ese-Odo"},
      {state_id:29,province_label:"Idanre"},
      {state_id:29,province_label:"Ifedore"},
      {state_id:29,province_label:"Ilaje"},
      {state_id:29,province_label:"Ile-Oluji"},
      {state_id:29,province_label:"Okeigbo"},
      {state_id:29,province_label:"Irele"},
      {state_id:29,province_label:"Odigbo"},
      {state_id:29,province_label:"Okitipupa"},
      {state_id:29,province_label:"Ondo East"},
      {state_id:29,province_label:"Ondo West"},
      {state_id:29,province_label:"Ose"},
      {state_id:29,province_label:"Owo"},
      {state_id:30,province_label:"Aiyedade"},
      {state_id:30,province_label:"Aiyedire"},
      {state_id:30,province_label:"Atakumosa East"},
      {state_id:30,province_label:"Atakumosa West"},
      {state_id:30,province_label:"Boluwaduro"},
      {state_id:30,province_label:"Boripe"},
      {state_id:30,province_label:"Ede North"},
      {state_id:30,province_label:"Ede South"},
      {state_id:30,province_label:"Egbedore"},
      {state_id:30,province_label:"Ejigbo"},
      {state_id:30,province_label:"Ife Central"},
      {state_id:30,province_label:"Ife East"},
      {state_id:30,province_label:"Ife North"},
      {state_id:30,province_label:"Ife South"},
      {state_id:30,province_label:"Ifedayo"},
      {state_id:30,province_label:"Ifelodun"},
      {state_id:30,province_label:"Ila"},
      {state_id:30,province_label:"Ilesha East"},
      {state_id:30,province_label:"Ilesha West"},
      {state_id:30,province_label:"Irepodun"},
      {state_id:30,province_label:"Irewole"},
      {state_id:30,province_label:"Isokan"},
      {state_id:30,province_label:"Iwo"},
      {state_id:30,province_label:"Obokun"},
      {state_id:30,province_label:"Odo-Otin"},
      {state_id:30,province_label:"Ola-Oluwa"},
      {state_id:30,province_label:"Olorunda"},
      {state_id:30,province_label:"Oriade"},
      {state_id:30,province_label:"Orolu"},
      {state_id:30,province_label:"Osogbo"},
      {state_id:31,province_label:"Afijio"},
      {state_id:31,province_label:"Akinyele"},
      {state_id:31,province_label:"Atiba"},
      {state_id:31,province_label:"Atigbo"},
      {state_id:31,province_label:"Egbeda"},
      {state_id:31,province_label:"Ibadan Central"},
      {state_id:31,province_label:"Ibadan North"},
      {state_id:31,province_label:"Ibadan North West"},
      {state_id:31,province_label:"Ibadan South East"},
      {state_id:31,province_label:"Ibadan South West"},
      {state_id:31,province_label:"Ibarapa Central"},
      {state_id:31,province_label:"Ibarapa East"},
      {state_id:31,province_label:"Ibarapa North"},
      {state_id:31,province_label:"Ido"},
      {state_id:31,province_label:"Irepo"},
      {state_id:31,province_label:"Iseyin"},
      {state_id:31,province_label:"Itesiwaju"},
      {state_id:31,province_label:"Iwajowa"},
      {state_id:31,province_label:"Kajola"},
      {state_id:31,province_label:"Lagelu Ogbomosho North"},
      {state_id:31,province_label:"Ogbmosho South"},
      {state_id:31,province_label:"Ogo Oluwa"},
      {state_id:31,province_label:"Olorunsogo"},
      {state_id:31,province_label:"Oluyole"},
      {state_id:31,province_label:"Ona-Ara"},
      {state_id:31,province_label:"Orelope"},
      {state_id:31,province_label:"Ori Ire"},
      {state_id:31,province_label:"Oyo East"},
      {state_id:31,province_label:"Oyo West"},
      {state_id:31,province_label:"Saki East"},
      {state_id:31,province_label:"Saki West"},
      {state_id:31,province_label:"Surulere"},
      {state_id:32,province_label:"Barikin Ladi"},
      {state_id:32,province_label:"Bassa"},
      {state_id:32,province_label:"Bokkos"},
      {state_id:32,province_label:"Jos East"},
      {state_id:32,province_label:"Jos North"},
      {state_id:32,province_label:"Jos South"},
      {state_id:32,province_label:"Kanam"},
      {state_id:32,province_label:"Kanke"},
      {state_id:32,province_label:"Langtang North"},
      {state_id:32,province_label:"Langtang South"},
      {state_id:32,province_label:"Mangu"},
      {state_id:32,province_label:"Mikang"},
      {state_id:32,province_label:"Pankshin"},
      {state_id:32,province_label:"Qua'an Pan"},
      {state_id:32,province_label:"Riyom"},
      {state_id:32,province_label:"Shendam"},
      {state_id:32,province_label:"Wase"},
      {state_id:33,province_label:"Abua/Odual"},
      {state_id:33,province_label:"Ahoada East"},
      {state_id:33,province_label:"Ahoada West"},
      {state_id:33,province_label:"Akuku Toru"},
      {state_id:33,province_label:"Andoni"},
      {state_id:33,province_label:"Asari-Toru"},
      {state_id:33,province_label:"Bonny"},
      {state_id:33,province_label:"Degema"},
      {state_id:33,province_label:"Emohua"},
      {state_id:33,province_label:"Eleme"},
      {state_id:33,province_label:"Etche"},
      {state_id:33,province_label:"Gokana"},
      {state_id:33,province_label:"Ikwerre"},
      {state_id:33,province_label:"Khana"},
      {state_id:33,province_label:"Obia/Akpor"},
      {state_id:33,province_label:"Ogba/Egbema/Ndoni"},
      {state_id:33,province_label:"Ogu/Bolo"},
      {state_id:33,province_label:"Okrika"},
      {state_id:33,province_label:"Omumma"},
      {state_id:33,province_label:"Opobo/Nkoro"},
      {state_id:33,province_label:"Oyigbo"},
      {state_id:33,province_label:"Port-Harcourt"},
      {state_id:33,province_label:"Tai"},
      {state_id:34,province_label:"Binji"},
      {state_id:34,province_label:"Bodinga"},
      {state_id:34,province_label:"Dange-shnsi"},
      {state_id:34,province_label:"Gada"},
      {state_id:34,province_label:"Goronyo"},
      {state_id:34,province_label:"Gudu"},
      {state_id:34,province_label:"Gawabawa"},
      {state_id:34,province_label:"Illela"},
      {state_id:34,province_label:"Isa"},
      {state_id:34,province_label:"Kware"},
      {state_id:34,province_label:"kebbe"},
      {state_id:34,province_label:"Rabah"},
      {state_id:34,province_label:"Sabon birni"},
      {state_id:34,province_label:"Shagari"},
      {state_id:34,province_label:"Silame"},
      {state_id:34,province_label:"Sokoto North"},
      {state_id:34,province_label:"Sokoto South"},
      {state_id:34,province_label:"Tambuwal"},
      {state_id:34,province_label:"Tqngaza"},
      {state_id:34,province_label:"Tureta"},
      {state_id:34,province_label:"Wamako"},
      {state_id:34,province_label:"Wurno"},
      {state_id:34,province_label:"Yabo"},
      {state_id:35,province_label:"Ardo-kola"},
      {state_id:35,province_label:"Bali"},
      {state_id:35,province_label:"Donga"},
      {state_id:35,province_label:"Gashaka"},
      {state_id:35,province_label:"Cassol"},
      {state_id:35,province_label:"Ibi"},
      {state_id:35,province_label:"Jalingo"},
      {state_id:35,province_label:"Karin-Lamido"},
      {state_id:35,province_label:"Kurmi"},
      {state_id:35,province_label:"Lau"},
      {state_id:35,province_label:"Sardauna"},
      {state_id:35,province_label:"Takum"},
      {state_id:35,province_label:"Ussa"},
      {state_id:35,province_label:"Wukari"},
      {state_id:35,province_label:"Yorro"},
      {state_id:35,province_label:"Zing"},
      {state_id:36,province_label:"Bade"},
      {state_id:36,province_label:"Bursari"},
      {state_id:36,province_label:"Damaturu"},
      {state_id:36,province_label:"Fika"},
      {state_id:36,province_label:"Fune"},
      {state_id:36,province_label:"Geidam"},
      {state_id:36,province_label:"Gujba"},
      {state_id:36,province_label:"Gulani"},
      {state_id:36,province_label:"Jakusko"},
      {state_id:36,province_label:"Karasuwa"},
      {state_id:36,province_label:"Karawa"},
      {state_id:36,province_label:"Machina"},
      {state_id:36,province_label:"Nangere"},
      {state_id:36,province_label:"Nguru Potiskum"},
      {state_id:36,province_label:"Tarmua"},
      {state_id:36,province_label:"Yunusari"},
      {state_id:36,province_label:"Yusufari"},
      {state_id:37,province_label:"Anka"},
      {state_id:37,province_label:"Bakura"},
      {state_id:37,province_label:"Birnin Magaji"},
      {state_id:37,province_label:"Bukkuyum"},
      {state_id:37,province_label:"Bungudu"},
      {state_id:37,province_label:"Gummi"},
      {state_id:37,province_label:"Gusau"},
      {state_id:37,province_label:"Kaura"},
      {state_id:37,province_label:"Namoda"},
      {state_id:37,province_label:"Maradun"},
      {state_id:37,province_label:"Maru"},
      {state_id:37,province_label:"Shinkafi"},
      {state_id:37,province_label:"Talata Mafara"},
      {state_id:37,province_label:"Tsafe"},
      {state_id:37,province_label:"Zurmi"}
		])

		await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = ProvinceSeeder
