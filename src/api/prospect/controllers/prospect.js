'use strict';

/**
 * prospect controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::prospect.prospect', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    // const mailList = ['digital@pitchpromotion.fr', 'pitchpromo@serenis.fr', 'anniechung.web@gmail.com', 'anouk.dib@extreme.fr']
    // const mailList = ['luk.attali@gmail.com', 'anouk.dib@extreme.fr'];
    const mailList = ['luk.attali@gmail.com'];

    let textMail = 'Bonjour'
    textMail += '<br /><br />'

    textMail += 'Cette personne a souhaité :<br />'
    if (response.data.attributes.brochure) {
      textMail += 'Recevoir la brochure<br />'
    }
    if (response.data.attributes.info) {
      textMail += 'Obtenir plus d’informations<br />'
    }
    if (response.data.attributes.type === 'visio') {
      textMail += 'Planifier un RDV en visioconférence<br />'
    } else if (response.data.attributes.type === 'call') {
      textMail += 'Être appelé<br />'
    } else if (response.data.attributes.type === 'rdv') {
      textMail += 'Prendre RDV en espace de vente<br />'
    }

    textMail += '<br /><br />'
    textMail += 'Ses coordonnées :'
    textMail += '<br /><br />'

    textMail += 'Civilité : ' + response.data.attributes.civilite + '<br />'
    textMail += 'Nom : ' + response.data.attributes.nom + '<br />'
    textMail += 'Prénom : ' + response.data.attributes.prenom + '<br />'
    textMail += 'Mail : ' + response.data.attributes.email + '<br />'
    textMail += 'Téléphone : ' + response.data.attributes.telephone + '<br />'
    textMail += 'Ville : ' + response.data.attributes.ville + '<br />'
    textMail += 'Code Postal : ' + response.data.attributes.codePostal + '<br /><br />'
    
    if (response.data.attributes.type === 'visio' || response.data.attributes.type === 'rdv') {
      textMail += 'Date rendez-vous souhaitée : ' + response.data.attributes.date + '<br />'
      textMail += 'Heure rendez-vous souhaitée : ' + response.data.attributes.heure + '<br />'
    }
    
    if (response.data.attributes.type === 'call') {
      textMail += 'Plage horaire : ' + response.data.attributes.heure + '<br />'
    }
    
    textMail += '<br />'
    
    textMail += 'IDPRIMPROMO : 25245<br />'
    textMail += 'Ville du programme : Lyon<br />'
    textMail += 'Nom du programme : KI - Part Dieu<br /><br />'
    
    textMail += 'Source : ' + response.data.attributes.utmSource + '<br />'
    textMail += 'Média : ' + response.data.attributes.utmMedium + '<br />'
    textMail += 'Campagne : ' + response.data.attributes.utmCampagne + '<br /><br />'
    
    textMail += 'Destination du bien : ' + response.data.attributes.interet + '<br />'
    textMail += 'Date : ' + response.data.attributes.dateSoumission + '<br /><br />'

    const nlChecked = response.data.attributes.nl ? "OUI" : "NON"
    textMail += 'J’accepte de recevoir des alertes et des contenus personnalisés de la part de Pitch Immo m’informant de ses produits et services: ' + nlChecked

    await strapi
    .plugin('email')
    .service('email')
    .send({
      to: mailList,
      from: 'anouk.dib@extreme.fr',
      subject: '(69) Lyon – KI - Part Dieu - pitchimmo.fr',
      html: textMail,
    });

    return response;
  }
}))
