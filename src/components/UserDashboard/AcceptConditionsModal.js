import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';

import { useTranslation } from 'react-i18next';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AcceptConditionModal = ({ open, accepted }) => {
  const [CGUAccepted, setCGUAccepted] = useState(false);
  const [CGVAccepted, setCGVAccepted] = useState(false);
  const [RGPDAccepted, setRGPDAccepted] = useState(false);

  const { t } = useTranslation();

  const conditionAcceptedHandle = () => {
    accepted(false);
  };

  return (
    <>
      <div className="ApPlus_popup">
        <Dialog open={open} fullWidth maxWidth="lg">
          <div className="ApPlus_popup_form accept_condition_container">
            <div className="infos">
              <i>* À valider en fin de page</i>
            </div>

            <div className="buyer_socond">
              <header>
                <h2 className="condition_section_title">
                  Conditions Générales d’Utilisation (CGU) *
                </h2>
                <h3>En vigueur au 10/10/2022</h3>
              </header>
              <section>
                <section className="condition_section_content">
                  <h4>Préambule</h4>
                  <p>
                    Les présentes conditions générales d’utilisation (les « CGU » ou « Conditions
                    Générales d’Utilisation ») régissent l’utilisation du site 
                    https://www.ezxport.com (ci-après le « Site ») par tout professionnel titulaire
                    d’un compte client ci-après défini suite à l’inscription aux services proposés
                    (ci-après « l’Utilisateur ») par la société EZXPORT (ci-après « la Société »)
                  </p>
                  <p>
                    En naviguant sur le Site, l’Utilisateur reconnait avoir pris connaissance et
                    accepter pleinement et sans réserve les CGU.
                  </p>
                  <p>
                    La Société se réserve le droit de modifier à tout moment les CGU. Elles seront
                    alors applicables dès leur mise en ligne. A ce titre, l’Utilisateur est invité à
                    prendre connaissance des présentes CGU régulièrement.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>1. Accès au site</h4>
                  <p>L'accès au site est réservé aux personnes majeures.</p>
                  <p>L'éditeur se réserve le droit de demander toute justification de votre âge.</p>
                  <p>
                    L'accès au site et son utilisation sont réservés à un usage strictement
                    personnel des utilisateurs.
                  </p>
                  <p>
                    Vous vous engagez à ne pas utiliser ce site, les informations et les données qui
                    y figurent à des fins commerciales, politiques, publicitaires et pour toute
                    forme de sollicitation commerciale et notamment l'envoi de courriers
                    électroniques non sollicités.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>2. Compte client</h4>
                  <p>
                    Le compte client doit être créé sur le Site par le représentant légal de la
                    personne morale qui souhaite recourir aux services de la Société (le
                    « Compte »).{' '}
                  </p>
                  <p>
                    Lors de son inscription, le représentant légal renseigne une adresse
                    électronique et un mot de passe choisis par lui (les « Identifiants ») dont la
                    saisie permettra la connexion au Compte.
                  </p>
                  <p>
                    Le représentant légal est en charge de la gestion de ce Compte. Il gère
                    notamment les demandes de certificat de conformité.
                  </p>
                  <p>
                    Seuls les Utilisateurs titulaires d’un Compte peuvent accéder à l'ensemble des
                    fonctionnalités et services du Site.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>3. Conditions d'inscription</h4>
                  <p>L'inscription sur le Site en tant que Client est gratuite.</p>
                  <p>
                    L'Utilisateur est invité à fournir des informations permettant de l'identifier
                    en complétant la fiche client. En remplissant ce formulaire, l’Utilisateur
                    déclare avoir pris connaissance :
                  </p>
                  <p>
                    <ul>
                      <li>des présentes Conditions Générales d’Utilisation,</li>
                      <li>des conditions générales de vente </li>
                      <li>et de la charte de protection des données personnelles</li>
                      <li>et les accepte sans réserve.</li>
                    </ul>
                  </p>
                  <p>
                    L’Utilisateur s'engage à fournir de manière loyale à la Société des données
                    exactes et complètes (nom, prénom, adresse électronique, numéro de téléphone,
                    etc.) qui ne portent pas atteinte, à quelque titre que ce soit, aux droits de
                    tiers, quels qu'ils soient.
                  </p>
                  <p>
                    L’Utilisateur s'engage à mettre les informations précitées à jour et à corriger
                    les éventuelles erreurs les affectant. La Société se réserve le droit de
                    demander à l’Utilisateur de confirmer, par tout moyen approprié, son identité,
                    son éligibilité et les informations communiquées.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>4. Spécifications techniques</h4>
                  <p>
                    L’Utilisateur reconnait disposer des moyens et compétences nécessaires à
                    l’utilisation du Site. Les équipements nécessaires à l’accès et à l’utilisation
                    du Site sont à la charge de l’Utilisateur, de même que les frais de
                    télécommunications induits par leur utilisation.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>5. Gestion des Identifiants</h4>
                  <p>
                    L’Utilisateur s'engage à ne créer qu'un seul Compte correspondant à la personne
                    morale dont il est le représentant légal.
                  </p>
                  <p>
                    Les Identifiants sont personnels. Le choix des Identifiants doit s'opérer dans
                    le respect de la législation en vigueur, notamment celle relative à l'usurpation
                    d'identité (Article 434-23 du Code pénal) ou à la contrefaçon de marque ou de
                    droits d'auteur (Articles L.335-2 et suivants ou L.713-1 et suivants du Code de
                    la Propriété intellectuelle).
                  </p>
                  <p>
                    Il appartient à l’Utilisateur d'assurer la confidentialité de ses Identifiants.
                    Toute connexion au Compte d'un Utilisateur à partir des Identifiants sera
                    présumée avoir été faite par l’Utilisateur lui-même. L’Utilisateur est seul
                    responsable de l'utilisation de ses Identifiants par des tiers ou des actions ou
                    déclarations faites par l'intermédiaire de son Compte, qu'elles soient
                    frauduleuses ou non. C'est pourquoi l’Utilisateur garantit la Société contre
                    toute demande faite à ce titre.
                  </p>
                  <p>
                    En effet, il est rappelé que la Société n'a pas pour obligation de vérifier
                    l'identité de chaque Utilisateur. Par conséquent, en cas d'usurpation d'identité
                    d'un Utilisateur, la Société ne saurait être tenue pour responsable.
                  </p>
                  <p>
                    En tout état de cause, si un Utilisateur suspecte une utilisation frauduleuse de
                    son Compte, il devra immédiatement en avertir la Société. Cette dernière
                    s'engage à préserver la confidentialité et la sécurité des Identifiants du
                    Client. Conformément à l'article 4, la Société se réserve le droit de suspendre
                    ou supprimer le Compte du Client en cas d'enregistrement incomplet.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>6. Contenu du Site</h4>
                  <p>
                    Toutes les marques, photographies, textes, commentaires, illustrations, images
                    animées ou non, séquences vidéo, sons, ainsi que toutes les applications
                    informatiques qui pourraient être utilisées pour faire fonctionner ce Site et
                    plus généralement tous les éléments reproduits ou utilisés sur le Site sont
                    protégés par les lois en vigueur au titre de la propriété intellectuelle.
                  </p>
                  <p>
                    Ils sont la propriété pleine et entière de l'éditeur ou de ses partenaires.
                    Toute reproduction, représentation, utilisation ou adaptation, sous quelque
                    forme que ce soit, de tout ou partie de ces éléments, y compris les applications
                    informatiques, sans l'accord préalable et écrit de l'éditeur, sont strictement
                    interdites. Le fait pour l'éditeur de ne pas engager de procédure dès la prise
                    de connaissance de ces utilisations non autorisées ne vaut pas acceptation
                    desdites utilisations et renonciation aux poursuites.
                  </p>
                  <p>
                    Les photographies de produits, accompagnant leur description, ne sont pas
                    contractuelles et n'engagent pas l'éditeur.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>7. Gestion du site</h4>
                  <p>
                    La Société a adopté des mesures raisonnables pour assurer une sécurisation de
                    l’accès au Site. Ces mesures de sécurité sont notamment les suivantes (liste non
                    limitative) :{' '}
                  </p>
                  <p>
                    <ul>
                      <li>
                        Authentification des Utilisateurs par un identifiant et un mot de passe ; le
                        mot de passe est choisi par le Client et ne peut être connu que par lui et
                        ses Utilisateurs. Il n’est jamais transmis à l’Utilisateur par quelque moyen
                        que ce soit. Il n’est pas accessible aux collaborateurs du Fournisseur.
                      </li>
                      <li>
                        Sécurisation de l’accès aux données ; seuls les Utilisateurs rattachés à un
                        Compte Client peuvent visualiser et accéder aux données et documents de ce
                        Compte Client.
                      </li>
                      <li>
                        Sécurisation des échanges réseau ; l’éditeur a mis en place le protocole de
                        transfert chiffré HTTPS pour sécuriser les informations circulant sur le
                        réseau internet dans le cadre des Services fournis.
                      </li>
                      <li>
                        Sécurité de la plate-forme serveur ; l’éditeur a adopté des moyens adaptés
                        de collecte, de stockage et de traitement de données, ainsi que des mesures
                        de sécurité logicielle et physique spécifiques pour se protéger contre
                        l’accès, la modification, la divulgation ou la destruction non autorisées
                        des données et documents des Comptes Clients. Le centre d’hébergement
                        serveur est physiquement implanté en France et applique également de
                        strictes procédures de sauvegarde et de sécurité.
                      </li>
                    </ul>
                  </p>
                  <p>Pour la bonne gestion du Site, l'éditeur pourra à tout moment :</p>
                  <p>
                    <ul>
                      <li>
                        suspendre, interrompre ou limiter l'accès à tout ou partie du Site, réserver
                        l'accès au Site, ou à certaines parties du Site, à une catégorie déterminée
                        d'internaute ;
                      </li>
                      <li>
                        supprimer toute information pouvant en perturber le fonctionnement ou
                        entrant en contravention avec les lois nationales ou internationales, ou
                        avec les règles de la Nétiquette ;
                      </li>
                      <li>suspendre le Site afin de procéder à des mises à jour.</li>
                    </ul>
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>8. Données à caractère personnel</h4>
                  <p>
                    L’Utilisateur est invité à se reporter à la charte de protection des données
                    personnelles accessibles sur le Site.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>9. Responsabilité</h4>
                  <p>
                    En aucun cas la Société ne pourra être tenue pour responsable si le Client
                    utilise le logiciel pour présenter et organiser sa gestion et sa comptabilité
                    d’une façon qui n’est pas conforme à la législation en vigueur.
                  </p>
                  <p>
                    <ol>
                      <li>
                        <p>
                          La Société ne sera pas responsable de toute perte ou déformation du
                          contenu des documents téléchargés par l’Utilisateur sur le serveur.
                        </p>
                        <p>
                          L’Utilisateur garantit que les identifiants, mots de passe et équivalents
                          obtenus par un Utilisateur lors de son inscription sont enregistrés et
                          utilisés de manière sécurisée, sans que les tiers ne puissent y accéder ni
                          les utiliser.
                        </p>
                        <p>
                          L’Utilisateur sera responsable de toute utilisation non autorisée des
                          Services. La Société ne sera aucunement responsable pour toute perte ou
                          tout dommage découlant du manquement de l’Utilisateur à respecter ces
                          exigences.
                        </p>
                        <p>
                          Lorsqu’il est suspecté qu’une personne non autorisée ait pu avoir
                          connaissance de l'identifiant et du mot de passe d’un Utilisateur, ce
                          dernier devra immédiatement en aviser la Société.
                        </p>
                      </li>
                      <li>
                        <p>
                          En cas de défauts majeurs qui empêchent sérieusement l’utilisation du Site
                          par le Client et qui sont imputables à une négligence grave de l’éditeur,
                          ce dernier s’engage à agir pour corriger ce défaut sans retard excessif.
                          En l’absence d’intention ou de négligence grave de la part de l’éditeur,
                          ce dernier n’assumera par ailleurs aucune responsabilité se rapportant aux
                          défauts ou défaillances empêchant l’accès au Site ou à l’une de ses
                          fonctionnalités. Les notifications d’erreurs devront être remises par le
                          Client conformément aux instructions annoncées par l’éditeur sur le Site
                          Web et dans un délai raisonnable suivant la découverte du défaut.
                        </p>
                        <p>
                          Le matériel de connexion au Site que vous utilisez est sous votre entière
                          responsabilité. Vous devez prendre toutes les mesures appropriées pour
                          protéger votre matériel et vos propres données notamment d'attaques
                          virales par Internet. Vous êtes par ailleurs le seul responsable des sites
                          et données que vous consultez.
                        </p>
                      </li>
                      <li>
                        <p>
                          L'éditeur ne pourra être tenu responsable en cas de poursuites judiciaires
                          à l’encontre de l’Utilisateur :
                        </p>
                        <ul>
                          <li>
                            du fait de l'usage du Site ou de tout service accessible via Internet ;
                          </li>
                          <li>du fait du non-respect des présentes CGU.</li>
                        </ul>
                      </li>
                    </ol>
                  </p>
                  <p>
                    Si l'éditeur venait à faire l'objet d'une procédure amiable ou judiciaire à
                    raison de l’utilisation du Site par l’Utilisateur, il pourra se retourner contre
                    lui pour obtenir indemnisation de tous les préjudices, sommes, condamnations et
                    frais qui pourraient découler de cette procédure.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>10. Cookies</h4>
                  <p>
                    Le Site peut collecter automatiquement des informations standards. Toutes les
                    informations collectées indirectement ne seront utilisées que pour suivre le
                    volume, le type et la configuration du trafic utilisant ce site, pour en
                    développer la conception et l'agencement et à d'autres fins administratives et
                    de planification et plus généralement pour améliorer le service que nous vous
                    offrons.
                  </p>
                  <p>
                    Ces cookies resteront stockés dans l'ordinateur de l'internaute pendant cinq ans
                    (5 ans), à moins que l'internaute ne les supprime.
                  </p>
                  <p>
                    Tout internaute a la possibilité de refuser ces cookies en cliquant sur le
                    bouton « supprimer les cookies » dans les options Internet/onglets :
                    confidentialité, sachant que l'utilisation du site pourra s'en trouver limitée.
                    Un cookie ne nous permet pas de vous identifier. De manière générale, il
                    enregistre des informations relatives à la navigation de votre ordinateur sur
                    notre site (les pages que vous avez consultées, la date et l'heure de la
                    consultation, etc.) que nous pourrons lire lors de vos visites ultérieures.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>11. Loi applicable</h4>
                  <p>
                    Les présentes conditions d'utilisation du site sont régies par la loi française
                    et soumises à la compétence des tribunaux français.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>12. Nous contacter</h4>
                  <p>
                    Pour toute question, information sur le Site, l’Utilisateur est invité à
                    contacter la Société à l'adresse suivante{' '}
                    <a href="mailto:contact@ezxport.com">contact@ezxport.com</a> ou au numéro de
                    téléphone suivant : 07.56.90.08.82.
                  </p>
                  <p>Contact juridique : Me Dahlia ARFI-ELKAÏM, avocat au Barreau de Paris.</p>
                  <p>AARPI JDB AVOCATS- 30 rue Marbeuf 75008 PARIS</p>
                  <p>Tel :01.42.56.96.96</p>
                  <p>
                    <a href="www.jdbavocats.com">www.jdbavocats.com</a>
                  </p>
                </section>
              </section>

              <header>
                <hr />
                <h2 className="condition_section_title">
                  Conditions générale de vente (CGV – SaaS) *
                </h2>
                <h3>En vigueur au 10/10/2022</h3>
              </header>

              <section>
                <section className="condition_section_content">
                  <h4>1. Champ d’application</h4>
                  <p>
                    Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent, sans
                    restriction ni réserve toute relation contractuelle entre la société EZXPORT,
                    société par actions simplifiée, immatriculée au registre du commerce et des
                    sociétés de Paris sous le numéro 914 285 259, dont le siège social est situé
                    229, rue Saint-Honoré – 75001 PARIS (ci-après « le Prestataire ») et toute
                    personne physique ou morale publique ou privée, qui agit à des fins entrant dans
                    le cadre de son activité commerciale, industrielle, artisanale, libérale ou
                    agricole, y compris lorsqu'elle agit au nom ou pour le compte d'un autre
                    professionnel souhaitant recourir aux services ci-après définis du Prestataire
                    (ci-après « le Client ») au moyen de la passation d’une commande ci-après
                    définie (le « Contrat »).{' '}
                  </p>
                  <p>
                    Préalablement à toute commande ci-après définie, le Client reconnait avoir pris
                    connaissance des présentes CGV et les avoir acceptées en cochant la case prévue
                    à cet effet avant la mise en œuvre de la procédure de commande en ligne du site{' '}
                    <a href="http://app.ezxport.com">http://app.ezxport.com</a> ci-après définie.{' '}
                  </p>
                  <p>
                    Toute commande implique l’adhésion sans réserve aux présentes conditions
                    générales de vente qui prévalent sur toute autre condition.
                  </p>
                  <p>
                    Les présentes conditions générales de vente fixent notamment les conditions de
                    commande, de paiement, de livraison et d’utilisation des Services commandés par
                    les Clients.
                  </p>
                  <p>
                    Le Prestataire propose au Client des services de certification de conformité de
                    tout type de produits destinés à l’exportation vers des pays étrangers au sein
                    et hors Union Européenne.{' '}
                  </p>
                  <p>
                    Les caractéristiques principales des services sont présentées par le Prestataire
                    sur son site internet : <a href="https://ezxport.com">https://ezxport.com</a>.
                    (« le Site »). Le Client est tenu d’en prendre connaissance avant toute
                    passation de commande.
                  </p>
                  <p>
                    Ces CGV sont accessibles à tout moment sur le site{' '}
                    <a href="https://ezxport.com/cgv-saas">https://ezxport.com/cgv-saas</a> et
                    prévaudront sur toute autre document.
                  </p>
                  <p>
                    Les coordonnées du Prestataire sont les suivantes : contact@ezxport.com |
                    07.56.90.08.82
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>
                    2. Acceptation et opposabilité des présentes conditions générales de vente
                  </h4>
                  <p>
                    Le Client ne pourra pas passer commande sans avoir déclaré avoir pris
                    connaissance des présentes Conditions Générales de Ventes et les avoir
                    acceptées, lesquelles lui seront automatiquement soumises par le Site pour
                    lecture.
                  </p>
                  <p>
                    Aucun autre document que les présentes ne pourra créer d’obligations entre les
                    parties ou déroger aux présentes à moins de faire l’objet d’un écrit signé par
                    les parties.
                  </p>
                  <p>
                    Le fait que le Prestataire ne se prévale pas à un moment donné de l’une
                    quelconque des dispositions des présentes conditions générales de vente, ne peut
                    en aucune manière être interprété comme valant renonciation de sa part à s’en
                    prévaloir ultérieurement, notamment le fait de ne pas réclamer un paiement en
                    retard. L’éventuelle annulation d’une clause n’affectera pas la validité des
                    autres clauses des présentes.
                  </p>
                  <p>
                    Le Client déclare par ailleurs être parfaitement informé que les présentes
                    conditions générales de vente pourront être modifiées postérieurement à la
                    passation de commande ce dont il sera informé par écrit. Le Client aura alors
                    quarante-huit (48) heures à compter de cette notification de modification pour
                    exprimer, par écrit, son éventuel désaccord avec les conditions générales de
                    vente mises à jour. A défaut, il sera réputé les avoir acceptées.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>3. Description des services</h4>
                  <p>
                    Sans que cette liste ne soit exhaustive, les services proposés par la Société
                    sont les services internet du Site fournis au Client conformément aux présentes
                    CGV et présentant les caractéristiques et les fonctions décrites sur le Site. Le
                    Site permet à l’utilisateur (au sens des conditions générales d’utilisation
                    présentes sur le Site) d’accéder notamment aux services suivants (les
                    « Services ») :
                  </p>
                  <p>
                    <ul>
                      <li>
                        Simulation des nomenclatures douanières applicables aux fins de vérification
                        de la conformité des produits avant embarquement des produits à destination
                        notamment des pays suivants : Cameroun, Côte d’Ivoire ou du Gabon* ;
                      </li>
                      <li>Simulation du coût du certificat de conformité (CoC) en hors taxes ;</li>
                      <li>
                        Aide à la préparation du dossier de demande de certificat de conformité
                        (CoC) ;
                      </li>
                      <li>
                        Transmission à l’organisme de certification compétent et gestion de
                        l’instruction de la demande : renseigner les informations d’expédition et
                        les documents demandés ;
                      </li>
                      <li>
                        Aide à l’enregistrement du carnet d’adresses sur le Site : Prestataires,
                        acheteurs et lieux d’inspections ;
                      </li>
                      <li>
                        Stockage des documents communiqués par le Client sur son Compte Client (au
                        sens des conditions générales d’utilisation présentes sur le Site) aux fins
                        de constitution de son dossier de demande de certificat de conformité selon
                        les conditions et modalités prévues dans la charte de protection des données
                        consultable sur le Site ;
                      </li>
                      <li>
                        Aide à l’enregistrement des coordonnées des organismes de certification avec
                        lesquels le Client a l’habitude de travailler le cas échéant ;
                      </li>
                      <li>
                        Prise de contact avec un expert EZXPORT via la page contact présente sur le
                        Site.
                      </li>
                    </ul>
                  </p>
                  <p>
                    <i>
                      * Les informations indiquées lors de la simulation proviennent des sites
                      internet des organismes mandataires. Ces organismes sont amenés à modifier à
                      tout moment leurs informations compte tenu des législations propres à chaque
                      pays destinataire. Le Prestataire ne saurait en aucun cas être tenue pour
                      responsable d’une simulation erronée.
                    </i>
                  </p>
                  <p>
                    Les Services commandés par le Client seront fournis selon les modalités
                    suivantes :
                  </p>
                  <p>
                    <ul>
                      <li>
                        Audit des informations et documents requis pour la constitution du dossier
                        et transmis par le Client sur son Compte Client (au sens des CGU). Dans
                        l’hypothèse où des documents seraient manquants, le Client sera alerté sur
                        son Compte Client afin qu’il complète son dossier.
                      </li>
                      <li>
                        Après validation des documents par le Prestataire, le dossier sera envoyé à
                        l’organisme de certification.
                      </li>
                      <li>
                        Dans l’hypothèse où des documents complémentaires seraient requis, le Client
                        en sera alerté par email.
                      </li>
                      <li>
                        Le Client sera informé par email de l’état d’avancement de son dossier selon
                        les statuts suivants : En attente / Revue documentaire / Inspection de la
                        marchandise / Documents finaux / Validé
                      </li>
                      <li>
                        Une fois le dossier validé par l’organisme de certification, le Prestataire
                        communiquera le certificat de conformité au Client au format PDF.
                      </li>
                    </ul>
                  </p>
                  <p>
                    La prise en charge du dossier par le Prestataire se fait dans un délai de 48h
                    (hors weekend et jours fériés) à compter de la validation définitive de la
                    commande du Client, dans les conditions prévues aux présentes CGV à l’adresse
                    email indiquée par le Client lors de sa commande sur le Site.
                  </p>
                  <p>
                    Le Prestataire s’engage à faire ses meilleurs efforts pour fournir les Services
                    commandés par le Client dans les meilleurs délais, étant précisé que le Client
                    déclare être parfaitement informé que le Prestataire est tenu d’une obligation
                    de moyens.
                  </p>
                  <p>Afin de faciliter la bonne exécution des Services, le Client s’engage à :</p>
                  <p>
                    <ul>
                      <li>
                        fournir au Prestataire des informations et documents complets, exacts et
                        dans les délais nécessaires sans qu’il soit tenu d’en vérifier le caractère
                        complet ou l’exactitude ;
                      </li>
                      <li>
                        avertir directement le Prestataire de toute difficulté éventuelle relative à
                        l’exécution des Services.
                      </li>
                    </ul>
                  </p>
                  <p>
                    Le Prestataire ne sera pas responsable du retard pris en raison des délais de
                    traitement du dossier par l’organisme de certification ou du comportement du
                    Client qui tarderait à transmettre les documents requis ou les documents
                    complémentaires aux fins d’instruction de sa demande de certificat de
                    conformité.{' '}
                  </p>
                  <p>
                    En cas de demande particulière du Client concernant les conditions de fourniture
                    des Services, dûment acceptées par écrit par le Prestataire, les coûts y étant
                    liés feront l’objet d’une facturation spécifique complémentaire ultérieure.
                  </p>
                  <p>
                    A défaut de réserves ou réclamations expressément émises par le Client dans un
                    délai de 48 heures à compter de la réception des Services à l’adresse mail :{' '}
                    <a href="contact@ezxport.com">contact@ezxport.com</a>, ceux-ci seront réputés
                    conformes à la commande, en quantité et qualité.
                  </p>
                  <p>
                    Aucune réclamation ne pourra être valablement acceptée en cas de non-respect de
                    ces formalités et délais par le Client.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>4. Commandes</h4>
                  <p>
                    Il appartient au Client de sélectionner sur le Site, les Services qu’il désire
                    commander, selon les modalités suivantes :
                  </p>
                  <p>
                    <ul>
                      <li>
                        Après avoir créé son Compte Client (au sens des conditions générales
                        d’utilisation présentes sur le Site), le Client doit renseigner les
                        informations demandées afin de permettre la simulation des nomenclatures
                        douanières applicables ainsi que la simulation du coût du certificat de
                        conformité ;
                      </li>
                      <li>
                        Une fois les documents requis pour la création de la demande de certificat
                        de conformité transmis sur le Site, le Client peut choisir de mandater le
                        Prestataire aux fins de transmission à l’organisme de certification
                        compétent et de gestion de l’instruction de la demande de certificat de
                        conformité. Si cette option est choisie, le Client verra s’afficher une
                        fenêtre indiquant le montant global du certificat de conformité et de la
                        prestation du Prestataire en HT ;
                      </li>
                      <li>
                        Le Client sera ensuite redirigé vers un site de paiement sécurisé afin de
                        procéder au règlement de sa commande selon les modalités définies ci-après ;
                      </li>
                      <li>
                        Une fois le règlement effectué, le Client recevra une facture à l’adresse
                        mail indiquée lors de la création de son compte client (au sens des
                        conditions générales d’utilisation présentes sur le Site) ;{' '}
                      </li>
                    </ul>
                  </p>
                  <p>
                    La commande ne sera considérée comme valide qu’après paiement intégral du prix.
                    Il appartient au Client de vérifier l’exactitude de la commande et de signaler
                    immédiatement toute erreur.
                  </p>
                  <p>
                    Toute commande passée sur le Site constitue la formation d’un contrat conclu à
                    distance entre le Client et le Prestataire.
                  </p>
                  <p>
                    Le Prestataire se réserve le droit d’annuler ou de refuser toute commande d’un
                    Client avec lequel il existerait un litige relatif au paiement d’une commande
                    antérieure.
                  </p>
                  <p>
                    Le Client pourra suivre l’évolution de sa commande sur son compte client (au
                    sens des conditions générales d’utilisation présentes sur le Site).
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>5. Prix</h4>
                  <p>
                    Les Services sont fournis aux tarifs en vigueur figurant sur le Site, lors de
                    l’enregistrement de la commande par le Prestataire (le « Prix »).
                  </p>
                  <p>Les prix sont exprimés en Euros, HT et TTC.</p>
                  <p>
                    Les tarifs tiennent compte d’éventuelles réductions qui seraient consenties par
                    le Prestataire sur le Site.
                  </p>
                  <p>Ces tarifs sont fermes et non révisables pendant leur période de validité.</p>
                  <p>
                    Le Client est informé que le Prix des Services ne comprend pas le montant du
                    certificat de conformité qui est fixé indépendamment de la volonté du
                    Prestataire par le gouvernement du pays destinataire des produits selon la
                    quantité et les produits en question.
                  </p>
                  <p>
                    Le récapitulatif de la commande avant le règlement fera apparaitre distinctement
                    le Prix des Services et le coût du certificat de conformité.{' '}
                  </p>
                  <p>
                    Le Client est en outre parfaitement informé que compte tenu de la modification
                    de législation qui peut intervenir dans les pays destinataires des produits qui
                    nécessitent un certificat de conformité, le coût du certificat de conformité
                    peut changer, sans que le Prestataire ne puisse en être tenu pour responsable.
                  </p>
                  <p>
                    Le Prix ne comprend pas non plus les frais de traitement, d’expédition, de
                    transport et de livraison, qui sont facturés en supplément, dans les conditions
                    indiquées sur le Site et calculés préalablement à la passation de la commande.
                  </p>
                  <p>
                    Des droits de douane ou autres taxes locales ou droits d’importation ou taxes
                    d’état sont susceptibles d’être appliqués selon le pays de destination des
                    marchandises.
                  </p>
                  <p>
                    Une facture est établie par le Prestataire et remise au Client lors de la
                    fourniture des Services commandés.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>6. Conditions de règlement</h4>
                  <p>
                    Le Client devra procéder au règlement du Prix sur le site de paiement sécurisé
                    sur lequel il sera redirigé après avoir validé le résumé de sa commande.{' '}
                  </p>
                  <p>
                    Les modes de paiement autorisés sont ceux par carte bancaire et par virement
                    SEPA.{' '}
                  </p>
                  <p>
                    Le Prix est payable comptant par le Client, en totalité au jour de la passation
                    de la commande.
                  </p>
                  <p>
                    Les données de paiement sont échangées en mode crypté grâce au protocole défini
                    par le prestataire de paiement agréé intervenant pour les transactions bancaires
                    réalisées sur le Site.
                  </p>
                  <p>
                    Les paiements effectués par le Client seront considérés comme définitifs après
                    encaissement effectif des sommes dues, par le Prestataire.
                  </p>
                  <p>
                    Le Prestataire ne sera pas tenu de procéder à la fourniture des Services
                    commandés par le Client si celui-ci ne lui en paye pas le prix en totalité dans
                    les conditions ci-dessus indiquées.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>7. Droit de rétractation</h4>
                  <p>
                    En qualité de professionnel, le Client ne bénéficiera d’aucun droit de
                    rétractation.
                  </p>
                  <p>
                    Le contrat est donc conclu de façon définitive dès la passation de la commande
                    par le Client selon les modalités précisées aux présentes CGV.
                  </p>
                  <p>
                    Toutefois, et conformément aux dispositions de l’article L. 221-3 du Code de la
                    consommation, le Client bénéficie d’un droit de rétractation si la Commande
                    passée n’entre pas dans son champ d’activité principale et que le nombre de
                    salariés employés par lui est inférieur ou égal à cinq (5). Dans cette hypothèse
                    seulement, le Client dispose d'un délai de quatorze (14) jours pour exercer son
                    droit de rétractation sans avoir à motiver sa décision à compter du jour de la
                    conclusion du contrat. L’exercice du droit de rétractation s’exerce au choix du
                    Client via l’utilisation d’un formulaire de rétractation, soit par toute autre
                    déclaration dénuée d’ambiguïté exprimant sa volonté de se rétracter. Dès lors
                    que le Client aura valablement exprimé sa volonté de rétractation, le
                    Prestataire procèdera alors au remboursement de la commande.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>8. Limite de garantie</h4>
                  <p>
                    Le Prestataire garantit qu’il fournira les Services d’une manière
                    professionnelle en conformité avec les caractéristiques de service. Si les
                    Services qui sont fournis au Client n’ont pas été effectués comme garantis, le
                    Client doit le notifier par écrit au Prestataire par le biais de son service
                    assistance ouvert du lundi au vendredi de 9h00 à 17h00.
                  </p>
                  <p>
                    Le Prestataire ne garantit pas que les Services seront exemptés d’erreur ou
                    exécutés de manière ininterrompue ou qu’il corrigera toutes les erreurs des
                    Services. Le Client reconnait que le Prestataire ne contrôle pas le transfert de
                    données par les moyens de communication, y compris internet, et que les Services
                    peuvent faire l’objet de limites, délais et autres problèmes inhérents à
                    l’utilisation de telles installations de communication. Le Prestataire n’est pas
                    responsable des retards, non-distribution ou autres problèmes inhérents à
                    l’utilisation de tels moyens de communication.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>9. Garantie de contrefaçon</h4>
                  <p>
                    Le Prestataire garantit qu’il dispose de tous les droits de propriété
                    intellectuelle permettant de fournir les Services et que les Services fournis ne
                    portent pas atteinte à des droits de tiers, ni ne constituent une contrefaçon
                    d’une œuvre préexistante.{' '}
                  </p>
                  <p>
                    Le Prestataire garantit le Client contre toute action en contrefaçon qui
                    pourrait être intentée à son encontre par toute personne physique ou morale se
                    prévalant d’un droit de propriété intellectuelle portant sur les Services.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>10. Limitation de responsabilité</h4>
                  <p>
                    En l’absence d’intention ou de négligence grave, le Prestataire ne pourra, en
                    aucun cas, être responsable des pertes indirectes, pertes de profits ou
                    d’économies, de pertes de revenus, pertes de données.
                  </p>
                  <p>
                    Le Client ne pourra pas prétendre à une réduction de paiement, à des dommages et
                    intérêts, ou à d’autres sanctions en cas d'interruptions ou d’erreurs empêchant
                    la transmission des données qui ne sont pas dues à une négligence grave de la
                    part du Prestataire.
                  </p>
                  <p>
                    En tout état de cause, la responsabilité totale du Prestataire pour tous les
                    dommages au titre du présent contrat sera limitée aux sommes effectivement
                    payées par le Client pour les Services au cours des douze (12) mois précédant
                    immédiatement l’évènement donnant lieu à ladite responsabilité.{' '}
                  </p>
                  <p>
                    Le Client répondra seul des conséquences liées aux préjudices subis par le
                    Prestataire et les tiers du fait de ses agissements fautifs.{' '}
                  </p>
                  <p>
                    Dans l’hypothèse où le Prestataire serait attrait en justice en raison
                    d’agissements fautifs du Client, ce dernier s’engage à le garantir de toute
                    condamnation et tout frais de justice pouvant en découler.{' '}
                  </p>
                  <p>
                    En cas de défauts majeurs qui empêchent sérieusement l’utilisation des Services
                    par le Client et qui sont imputables au Prestataire, le Prestataire s’engage à
                    agir pour corriger ce défaut sans retard excessif. En l’absence d’intention ou
                    de négligence grave de la part du Prestataire, ce dernier n’assumera par
                    ailleurs aucune responsabilité se rapportant aux défauts ou défaillances dans
                    les Services. Les notifications d’erreurs devront être remises par le Client
                    conformément aux instructions annoncées par le Prestataire sur le Site et dans
                    un délai raisonnable suivant la découverte du défaut.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>11. Données personnelles</h4>
                  <p>
                    Conformément au règlement n° 2016-679 du Parlement européen et du Conseil en
                    date du 27 avril 2016, dit RGPD, relatif à la protection des personnes physiques
                    à l’égard du traitement des données à caractère personnel et à la libre
                    circulation de ces données, en complément de la loi n° 78-17 du 6 janvier 1978
                    modifiée relative à l'informatique, aux fichiers et aux libertés, le Prestataire
                    a mis en place une charte de protection des données à caractère personnel dont
                    le Client reconnait avoir pris connaissance, préalablement à la passation de
                    toute Commande.
                  </p>
                  <p>
                    Le Client déclare être parfaitement informé que toutes données autres que les
                    données à caractère personnel au sens de l’article 4 dudit RGPD (ci-après « les
                    Données ») pourront pendant la durée du Contrat, être exploitées par le
                    Prestataire à des fins statistiques et de prospection commerciales, sauf avis
                    contraire exprimé par écrit par le Client et sous réserve qu’elles présentent un
                    intérêt d’amélioration des Services.
                  </p>
                  <p>
                    Ces Données n’incorporeront pas d’informations confidentielles sous une forme
                    qui pourrait servir à identifier le Client ou toute personne physique.{' '}
                  </p>
                  <p>
                    Les Données seront conservées par le Prestataire pendant une durée de cinq (5)
                    ans à compter de la réalisation des Services et pourront être transmises au
                    Client.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>12. Propriété intellectuelle</h4>
                  <p>
                    Le Prestataire conserve tous les droits de propriété et de propriété
                    intellectuelle pour les Services, y compris le Site et les œuvres dérivées de
                    ceux-ci, et sur tout ce qui a été développé ou remis par ou pour le compte du
                    Prestataire en vertu des présentes.{' '}
                  </p>
                  <p>
                    Les documents (modèles, textes de lois, etc.) mis à la disposition des Clients
                    sont destinés exclusivement à être utilisés pour constituer le dossier de
                    demande de certificat de conformité. Tout autre usage, y compris la mise à
                    disposition ou la communication à des tiers par le Client ou l’un de ses
                    membres, à titre commercial ou gratuit, est interdite et passible de poursuites,
                    conformément au Code la propriété intellectuelle. En outre l’utilisation de ces
                    documents par le Client n’est plus autorisée après la fin du Contrat pour
                    quelque cause que ce soit.{' '}
                  </p>
                  <p>
                    Les dispositions du paragraphe ci-dessus s’appliquent également aux états
                    produits par le Site sous la forme de fichiers au format Microsoft Excel ou PDF.
                    En outre ces fichiers ne peuvent en aucun cas être utilisés comme modèles pour
                    la gestion d’un autre dossier de demande de certificat de conformité que celui
                    pour lequel le Compte client a été ouvert.
                  </p>
                  <p>Il est fait interdiction au Client :</p>
                  <p>
                    <ul>
                      <li>
                        D’enlever ou de modifier les mentions relatives à la propriété du
                        Prestataire sur le Site ;
                      </li>
                      <li>
                        De mettre le Site ou les composants résultants des Services à la disposition
                        de tiers autres que ceux dont l’accès aux Services a été expressément
                        autorisé ;
                      </li>
                      <li>
                        De modifier, créer des œuvres dérivées, désassembler, décompiler, réaliser
                        de la rétroconception, reproduire, republier, télécharger quelconque partie
                        des Services et plus généralement d’accéder ou d’utiliser les Services afin
                        de construire ou de fournir directement ou indirectement un Service
                        concurrent
                      </li>
                    </ul>
                  </p>
                  <p>
                    Le Prestataire se réserve le droit de procéder à des modifications dans la
                    conception, la méthode de fonctionnement, les spécifications techniques, les
                    systèmes et toute autre fonction des Services, et ce à tout moment sans
                    notification préalable. Ces modifications de Services n’entraineront pas une
                    réduction du niveau d’exécution ou de disponibilité des Services applicables qui
                    sont fournis au Client pour la durée susvisée.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>13. Force majeure</h4>
                  <p>
                    Les parties ne seront pas réputées avoir manqué à leurs obligations si elles
                    sont empêchées d’exécuter tout ou partie de celles-ci à la suite d’un cas de
                    force majeure entendu au sens de l’article 1218 du code civil et de la
                    jurisprudence, sous réserve que la partie empêchée en informe l’autre partie,
                    par lettre recommandée avec avis de réception, dans les trois (3) jours
                    calendaires de la survenance de l’évènement et justifie du caractère de force
                    majeure.
                  </p>
                  <p>
                    La partie empêchée fera ses meilleurs efforts pour limiter et/ou éviter les
                    effets du cas de force majeure et tentera de trouver une solution adaptée afin
                    de reprendre l’exécution de ses obligations dans les meilleurs délais.{' '}
                  </p>
                  <p>
                    Si l’exécution de l’une des obligations essentielles de l’une ou l’autre partie
                    est différée du fait de la survenance d’un évènement de force majeure,
                    l’exécution sera suspendue jusqu’à la disparition dudit évènement. Toutefois,
                    dans l’hypothèse où l’évènement de force majeure se prolongerait au-delà d’un
                    (1) mois, chacune des parties aurait la faculté de résilier de plein droit avec
                    effet immédiat le Contrat par l’envoi d’une lettre recommandée avec avis de
                    réception.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>14. Modifications</h4>
                  <p>
                    Le Prestataire se réserve le droit de faire évoluer le contenu des Services,
                    mais il s'engage à conserver les fonctionnalités existantes. Il peut donc
                    enrichir ces fonctionnalités et/ou en proposer de nouvelles. Si de nouvelles
                    fonctionnalités sont intégrées aux Services, le Client bénéficie des nouvelles
                    fonctionnalités sans coût supplémentaire, sauf si le Prestataire décide de les
                    proposer sous la forme d'options payantes, auquel cas le Client devra souscrire
                    à ces options pour en bénéficier.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>15. Cession</h4>
                  <p>
                    Le Prestataire et le Client ne sont pas autorisés à céder le Contrat, ou à
                    donner ou transférer les Services, ou un droit sur ceux-ci, à une autre personne
                    physique ou morale, sauf accord exprès et écrit des parties.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>16. Assistance</h4>
                  <p>
                    Le Prestataire fournit au Client une assistance et une information se rapportant
                    à l’utilisation des Services par le biais de pop-ups explicatifs lors de la
                    première connexion du Client à son Compte Client (au sens des CGU).{' '}
                  </p>
                  <p>
                    Le Prestataire fournit également une assistance au Client par e-mail et
                    téléphone. Cette assistance est fournie du lundi au vendredi (à l’exception des
                    jours fériés ayant cours en France) de 9 heures à 17 heures.
                  </p>
                  <p>
                    Les demandes et/ou les avertissements d’erreurs devront être soumis au
                    Prestataire à l’adresse mail suivante :{' '}
                    <a href="contact@ezxport.com">contact@ezxport.com</a> (Objet : Erreur)
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>17. Dispositions générales</h4>
                  <p>
                    Le Contrat est élaboré en français et cette langue sera la langue de référence à
                    tous égards et prévaudra sur toutes les autres.
                  </p>
                  <p>
                    Si une disposition des présentes était déclarée inapplicable pour quelque raison
                    que ce soit, les autres dispositions demeureront pleinement en vigueur. La
                    disposition inapplicable sera modifiée dans la mesure du possible et dans la
                    limite autorisée par la loi pour atteindre autant que faire se peut la même
                    intention et le même effet économique que la disposition originale.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>18. Loi applicable</h4>
                  <p>
                    Tout litige relatif à l’interprétation, à l’application ou à l’exécution des
                    présentes conditions générales de vente et du présent contrat est soumis au
                    droit français. Les présentes conditions générales de vente ainsi que le présent
                    contrat sont intégralement rédigées en français, seule langue faisant foi dans
                    les relations entre les parties en cas de litige.{' '}
                  </p>
                  <p>
                    En cas de litige et/ou réclamation, il est recommandé au Client de se rapprocher
                    du Prestataire afin de rechercher et de trouver une solution amiable. Les
                    éventuels litiges qui pourraient survenir à l’occasion de l’exécution des
                    présentes et du Contrat, devront être explicités et justifiés par écrit
                    (courrier recommandé avec accusé de réception) pour qu’ils puissent être compris
                    et traités par le Prestataire.{' '}
                  </p>
                  <p>
                    A défaut d’accord amiable entre les parties, le litige sera soumis aux tribunaux
                    compétents de Paris.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>19. Nous contacter :</h4>
                  <p>
                    Pour toute question, le Client est invité à contacter le Prestataire à l'adresse
                    suivante <a href="contact@ezxport.com">contact@ezxport.com</a> ou au numéro de
                    téléphone suivant : 07.56.90.08.82.
                  </p>
                  <p>Contact juridique : Me Dahlia ARFI-ELKAÏM, Avocat au Barreau de Paris.</p>
                  <p>AARPI JDB AVOCATS- 30 rue Marbeuf 75008 PARIS</p>
                  <p>Tel :01.42.56.96.96</p>
                  <p>
                    <a href="www.jdbavocats.com">www.jdbavocats.com</a>
                  </p>
                </section>
              </section>
              <header>
                <hr />
                <h2 className="condition_section_title">
                  POLITIQUE DE CONFIDENTIALITÉ DE EZXPORT *
                </h2>
                <h3>Document mis à jour le 23/10/2022</h3>
              </header>
              <section>
                <section className="condition_section_content">
                  <p>
                    <b>EZXPORT</b> (« <b>EZXPORT »</b>, « <b>notre »</b>, « <b>nous »</b> et « 
                    <b>nos »</b>) et nos partenaires respectent votre vie privée.
                  </p>
                  <p>
                    Nous vous demandons de bien vouloir lire attentivement la présente politique de
                    confidentialité pour comprendre comment sont collectées, traitées et conservées
                    vos données personnelles lors de votre utilisation du présent site internet
                    EZXPORT, accessible via l'url{' '}
                    <a href="https://www.ezxport.com">https://www.ezxport.com</a>.
                  </p>
                  <p>
                    L'ensemble des données personnelles collectées sur le présent site internet sont
                    traitées sous la responsabilité de la société EZXPORT, SASU au capital social de
                    1000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le
                    numéro 914285259, et ayant son siège social 229 RUE SAINT HONORE, 75001 PARIS,
                    France.
                  </p>
                  <p>
                    Au sens de la réglementation applicable aux données personnelles, EZXPORT est
                    donc responsable de traitement.{' '}
                  </p>
                  <p>Cette politique de confidentialité décrit :</p>
                  <p>
                    <ol>
                      <li>Comment EZXPORT utilise vos données personnelles</li>
                      <li>Comment EZXPORT partage vos données personnelles</li>
                      <li>Comment EZXPORT protège vos données personnelles</li>
                      <li>Où EZXPORT héberge et transfère vos données personnelles</li>
                      <li>
                        Comment vous pouvez exercer vos droits relatifs à vos données personnelles
                      </li>
                      <li>Les mises à jour de la politique de confidentialité</li>
                      <li>Comment nous contacter</li>
                    </ol>
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>I. Comment EZXPORT utilise vos données personnelles</h4>
                  <p>EZXPORT peut utiliser vos données personnelles aux fins suivantes : </p>
                  <p>
                    <ol>
                      <li>Créer votre compte client sur le présent site internet</li>
                      <li>Gérer les commandes de produits et/ou services</li>
                      <li>
                        Publier et gérer vos avis et/ou commentaires laissés sur le site internet
                      </li>
                      <li>Vous adresser notre newsletter, dans le cas où vous y êtes inscrit</li>
                      <li>
                        Répondre à votre demande de contact effectuée à partir de notre site
                        internet
                      </li>
                    </ol>
                  </p>
                  <p>
                    Les données collectées sont nécessaires à l'exécution du contrat passé avec
                    EZXPORT lorsque vous utilisez notre site internet afin de commander les produits
                    et/ou services disponibles à la vente sur le site.{' '}
                  </p>
                  <p>
                    Le traitement de vos données personnelles afin de vous envoyer notre newsletter
                    est, en revanche, basé uniquement sur votre consentement à recevoir notre
                    newsletter, que vous pouvez retirer à tout moment. Si vous ne consentez pas à
                    l'envoi de la newsletter, veuillez noter que cela ne vous empêchera pas de créer
                    votre compte client et de passer des commandes sur notre site internet.{' '}
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>II. Comment EZXPORT partage vos données personnelles</h4>
                  <p>
                    Au sein de EZXPORT, et au regard de chaque finalité de traitement, les données
                    personnelles vous concernant sont collectées, traitées et stockées par le
                    personnel habilité de EZXPORT, uniquement dans le cadre de leurs compétences
                    respectives, et notamment par le service client, le département marketing et le
                    département informatique.
                  </p>
                  <p>
                    Nous ne partageons pas les données personnelles avec d'autres entreprises,
                    organisations et personnes, à moins que l'une des circonstances suivantes
                    s'applique :
                  </p>
                  <p>
                    <ol>
                      <li>
                        <b>Le partage avec consentement préalable :</b> après avoir obtenu votre
                        consentement, EZXPORT partagera les informations que vous avez autorisées
                        avec les tiers ou catégories de tiers spécifiques renseignés à l'occasion de
                        la collecte de votre consentement.{' '}
                      </li>
                      <li>
                        <b>Le partage avec nos prestataires :</b> EZXPORT peut également divulguer
                        vos informations à des entreprises qui fournissent des services pour nous ou
                        en notre nom. Ces prestataires de services comprennent des entreprises qui
                        proposent des services informatiques tels notamment notre hébergeur ou notre
                        prestataire d'envoi d'emails, des services de livraison de nos produits, ou
                        qui proposent des activités marketing pour notre compte. Ces prestataires de
                        services peuvent utiliser vos informations uniquement dans le but de vous
                        fournir des services au nom de EZXPORT.
                      </li>
                      <li>
                        <b>
                          En exécution d'une obligation légale, le partage conformément aux lois et
                          à la réglementation :
                        </b>{' '}
                        EZXPORT, peut partager vos informations comme le stipulent les lois et la
                        réglementation, afin de résoudre les différends d'ordre juridique, ou comme
                        le stipulent les autorités judiciaires ou administratives en vertu de la
                        loi.
                      </li>
                    </ol>
                  </p>
                  <p>
                    EZXPORT s'assurera de la légalité de tout partage des données personnelles via
                    des clauses de traitement de données avec les entreprises avec lesquelles vos
                    données personnelles sont partagées, les obligeant à se conformer à cette
                    politique de confidentialité et à prendre les mesures de sécurité et
                    confidentialité appropriées lors du traitement de données à caractère personnel.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>III. Comment EZXPORT protège vos données personnelles</h4>
                  <p>
                    EZXPORT attache une grande importance à la sécurité de vos données personnelles
                    et a adopté des pratiques courantes de l'industrie afin de protéger vos données
                    personnelles et d'éviter l'accès non autorisé, la divulgation, l'utilisation, la
                    modification, les dommages ou la perte de ces informations.{' '}
                  </p>
                  <p>
                    Nous avons par ailleurs pris les précautions utiles afin de préserver, par notre
                    hébergeur, la sécurité et la confidentialité des données, et notamment empêcher
                    qu’elles ne soient déformées, endommagées ou communiquées à des personnes non
                    autorisées.
                  </p>
                  <p>EZXPORT adopte également les mesures organisationnelles suivantes :</p>
                  <p>
                    <ol>
                      <li>
                        Nous adoptons des mesures raisonnables et réalisables afin de veiller à ce
                        que les données personnelles recueillies soient minimes et pertinentes selon
                        ce qui est nécessaire, eu égard aux fins pour lesquelles elles sont
                        traitées.
                      </li>
                      <li>
                        Nous conservons vos données personnelles pendant la durée qui est
                        strictement nécessaire au regard de la finalité du traitement, à moins que
                        la conservation de vos données soit requise ou permise par la loi. À titre
                        d’exemple, nous conservons les données liées à l’exécution de vos commandes
                        pour la durée requise par la loi au titre de conservation des dossiers
                        comptables, à savoir au maximum 10 ans à compter de l’exercice concerné.
                      </li>
                      <li>
                        Nous déployons les mécanismes de contrôle d'accès afin de s'assurer que seul
                        le personnel habilité peut accéder à vos données personnelles.{' '}
                      </li>
                    </ol>
                  </p>
                  <p>
                    En cas de violation des données personnelles, EZXPORT respectera les exigences
                    légales et réglementaires applicables à la notification des violations de
                    données personnelles auprès des autorités de contrôle compétentes et/ou des
                    personnes concernées.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>IV. Où EZXPORT héberge et transfère vos données personnelles</h4>
                  <p>
                    Vos données personnelles seront hébergées au sein des infrastructures
                    d’hébergement de notre hébergeur, Amazon Web Services Inc., situé en France.
                  </p>
                  <p>
                    Lorsque de tels transferts existent, nous nous assurons que ces transferts de
                    données personnelles soient encadrés conformément à la réglementation applicable
                    afin d’assurer un niveau de protection des données adéquat, soit par une
                    décision d’adéquation de la Commission européenne, soit par le biais
                    d’instruments juridiques tels que des contrats de transferts de données
                    intégrant les Clauses Contractuelles Types de la Commission Européenne.
                  </p>
                  <p>
                    Pour toute demande concernant les destinataires et les transferts de données que
                    nous effectuons en dehors de l’Union Européenne, veuillez nous contacter aux
                    adresses indiquées dans la rubrique « Comment nous contacter » ci-dessous.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>
                    V. Comment vous pouvez gérer vos droits relatifs à vos données personnelles
                  </h4>
                  <p>
                    Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation,
                    d’opposition concernant le traitement de vos données personnelles ainsi que du
                    droit de définir des directives relatives au sort de vos données après votre
                    mort et du droit à la portabilité de vos données personnelles.
                  </p>
                  <p>
                    Vous pouvez nous contacter à tout moment aux adresses indiquées dans la rubrique
                    ‘’Comment nous contacter’’ ci-dessous afin d’exercer vos droits en matière de
                    données personnelles dans les conditions posées par la réglementation
                    applicable. Vous devez indiquer quel droit vous entendez exercer ainsi que
                    l’ensemble des précisions nécessaires pour que nous puissions répondre à votre
                    demande.
                  </p>
                  <p>
                    Ces droits s’exercent dans les conditions posées par la réglementation
                    applicable.
                  </p>
                  <p>
                    <ul>
                      <li>
                        Le <b>droit d’accès</b> signifie que vous pouvez nous demander à tout moment
                        de vous indiquer si nous traitons des données personnelles vous concernant
                        et, le cas échéant, de vous indiquer quelles sont les données personnelles
                        concernées ainsi que les caractéristiques du ou des traitements effectués.
                      </li>
                      <li>
                        Le <b>droit de rectification</b> signifie que vous pouvez nous demander la
                        rectification de vos données personnelles lorsqu’elles sont inexactes. Vous
                        pouvez également demander à ce que vos données personnelles, dès lors
                        qu’incomplètes, soient complétées dans la mesure où cela est pertinent au
                        regard de la finalité du traitement en cause.
                      </li>
                      <li>
                        Le <b>droit à l’effacement</b> signifie que vous pouvez demander d’effacer
                        vos données personnelles notamment lorsque :
                        <ol type="i">
                          <li>
                            Leur conservation n’est plus nécessaire au regard des finalités pour
                            lesquelles elles ont été collectées ;
                          </li>
                          <li>
                            Vos données personnelles sont traitées sur le fondement de votre
                            consentement, vous souhaitez retirer ce consentement, et il n’existe pas
                            d'autre fondement juridique susceptible de justifier le traitement ;
                          </li>
                          <li>
                            Vous vous êtes opposé au traitement de vos données personnelles et vous
                            souhaitez en conséquence qu’elles soient effacées ;
                          </li>
                          <li>
                            Vos données personnelles ont fait l'objet d'un traitement illicite ;
                          </li>
                          <li>
                            Vos données personnelles doivent être effacées pour respecter une
                            obligation légale qui est prévue soit par le droit de l'Union Européenne
                            soit par le droit français.
                          </li>
                        </ol>
                      </li>
                      <li>
                        Le <b>droit à la limitation</b> signifie que vous pouvez nous demander de
                        procéder à la limitation du traitement de vos données personnelles :
                        <ol type="i">
                          <li>
                            Lorsque vous contestez l’exactitude de vos données personnelles pendant
                            une durée nous permettant de vérifier l’exactitude de celles-ci ;
                          </li>
                          <li>
                            Lorsque suite à un traitement établi comme non conforme, vous préférez
                            la limitation du traitement à l’effacement complet de vos données
                            personnelles ;
                          </li>
                          <li>
                            Lorsque nous n’avons plus besoin de vos données personnelles aux fins du
                            traitement mais que celles-ci vous sont encore nécessaires pour la
                            constatation, l’exercice ou la défense de droits en justice ;
                          </li>
                          <li>
                            Lorsque vous vous êtes opposé au traitement de vos données personnelles
                            et vous souhaitez une limitation du traitement pendant la durée nous
                            permettant de vérifier si le motif légitime que vous invoquez se
                            justifie.{' '}
                          </li>
                        </ol>
                      </li>
                    </ul>
                  </p>
                  <p>
                    La limitation du traitement signifie que le traitement de vos données
                    personnelles s’entendra alors du seul stockage de vos données personnelles
                    correspondantes. Nous n’effectuerons alors plus aucune autre opération sur les
                    données personnelles considérées.
                  </p>
                  <p>
                    <ul>
                      <li>
                        Le <b>droit d’opposition</b> signifie que vous pouvez vous opposer au
                        traitement de vos données personnelles, lorsque ce traitement est fondé sur
                        la poursuite de l’intérêt légitime de EZXPORT. Le droit d’opposition
                        s’exerce sous réserve de justifier d’un motif légitime tenant à votre
                        situation particulière. Nous cesserons alors le traitement en cause sauf
                        s’il existe des motifs légitimes et impérieux en justifiant la poursuite en
                        conformité avec la réglementation applicable.{' '}
                      </li>
                      <li>
                        Le{' '}
                        <b>
                          droit de définir des directives relatives au sort de vos données après
                          votre mort
                        </b>{' '}
                        vous permet de faire connaître vos instructions concernant la conservation,
                        l'effacement et la communication de vos données personnelles après votre
                        décès.
                      </li>
                      <li>
                        Le <b>droit à la portabilité</b> signifie que vous pouvez nous demander,
                        dans les conditions posées par la réglementation applicable, de recevoir vos
                        données personnelles dans un format structuré, couramment utilisé et lisible
                        par machine, et de vous les transmettre, ou de nous demander de les
                        transmettre directement à un tiers de votre choix lorsque cela est
                        juridiquement et techniquement possible.
                      </li>
                    </ul>
                  </p>
                  <p>
                    Lorsque nous traitons vos données personnelles sur la base de votre
                    consentement, vous disposez enfin de la faculté de retirer votre consentement à
                    tout moment en vous adressant aux adresses indiquées dans la rubrique ’’Comment
                    nous contacter’’ ou en cliquant sur le lien de désabonnement présent dans
                    chacune de nos communications.
                  </p>
                  <p>
                    Toutefois, le retrait de votre consentement ne remet pas en cause la validité du
                    traitement effectué avant ce retrait.
                  </p>
                </section>
                <section className="condition_section_content">
                  <h4>VI. Les mises à jour de cette politique de confidentialité</h4>
                  <p>
                    EZXPORT se réserve le droit à tout moment de modifier ou mettre à jour, en tout
                    ou en partie, la présente politique de confidentialité, en raison de la
                    modification de la réglementation applicable en matière de protection des
                    données personnelles ou des traitements de données effectués.
                  </p>
                  <p>
                    Toute modification substantielle de la politique de confidentialité vous sera
                    notifiée par e-mail lorsque vous nous avez communiqué une adresse mail valide et
                    sera publiée sur le site internet. Nous vous recommandons de prendre
                    régulièrement connaissance de la présente politique de confidentialité afin
                    d’avoir une parfaite connaissance de nos engagements en matière de sécurité et
                    de protection de vos données personnelles.
                  </p>
                </section>
                <section className="condition_section_content">
                  <p>
                    Si vous avez des questions, des commentaires ou des suggestions, veuillez nous
                    contacter en visitant la page contactez-nous ou en les soumettant à{' '}
                    <a href="mailto:contact@ezxport.com">contact@ezxport.com</a>.
                  </p>
                  <p>Ou par courrier postal à 229 RUE SAINT HONORE, 75001 PARIS, France.</p>
                  <p>
                    Si vous n'êtes pas satisfait de la réponse apportée par EZXPORT à une demande
                    d’exercice de droits conformément à l’article V ci-dessus ou que vous souhaitez
                    signaler une atteinte à la réglementation applicable en matière de protection
                    des données, vous disposez du droit d’introduire une réclamation auprès de la
                    CNIL par courrier (CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX
                    07) ou sur son site Internet (www.cnil.fr), ou auprès de l'autorité de
                    protection des données du pays dans lequel vous résidez ou travaillez
                    habituellement.
                  </p>
                </section>
              </section>
              <hr className="end" />
              <header>
                <h2 className="condition_section_title">Acceptation de conditions générales</h2>
              </header>
              <div className="infos">
                <i>* {t('Mandatory')}</i>
              </div>
              <FormControl fullWidth>
                <FormControlLabel
                  className="accept_condition_checkbox"
                  control={<Checkbox onChange={e => setCGUAccepted(e.target.checked)} />}
                  label={`${t('Accept CGU')}*`}
                />
                <FormControlLabel
                  className="accept_condition_checkbox"
                  control={<Checkbox onChange={e => setCGVAccepted(e.target.checked)} />}
                  label={`${t('Accept CGV')}*`}
                />
                <FormControlLabel
                  className="accept_condition_checkbox"
                  control={<Checkbox onChange={e => setRGPDAccepted(e.target.checked)} />}
                  label={`${t('Accept RGPD')}*`}
                />
              </FormControl>
            </div>
            <br />
            <button
              disabled={!(CGUAccepted && CGVAccepted && RGPDAccepted)}
              onClick={conditionAcceptedHandle}
              className="luyer_button">
              {t('To Valid')}
            </button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default AcceptConditionModal;
