import React, {Component} from "react";
import {redA400} from "material-ui/styles/colors";
import Stars from "../../components/Skills/Stars";
import Paper from "material-ui/Paper";

const style = {
    margin: '.5em', padding: '10px'
};

export class HelpPage extends Component {
    render() {
        const marginTop = 10;
        return (
            <div>
                <Paper style={style}>
                    <h3>Qu'est-ce qu'une compétence ?</h3>
                    <p style={{marginTop}}>
                        Une compétence représente un savoir, il peut être professionnel, lié à un outil, à une
                        connaissance ... Les utilisateurs peuvent ajouter n'importe qu'elle compétence. Une fois
                        enregistrée, elle fera partie de la liste proposée aux autres utilisateurs.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>Qu'est-ce qu'un domaine ?</h3>
                    <p style={{marginTop}}>
                        Un domaine est un ensemble de compétences. Les utilisateurs qui ont le rôle "manageur"
                        peuvent ajouter ou supprimer les domaines.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>Pourquoi certaines cartes de compétences sont quasi transparentes ?</h3>
                    <p style={{marginTop}}>
                        Une carte de compétence s'éclaircie lorsqu'elle ne possède pas le petit <span
                        className="interested-icon" style={{color: redA400}}>&#9829;</span>. Ainsi, les compétences
                        qui
                        intéressent le profil consulté sont mises en avant.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>Que représentent les <Stars level={1}/> ?</h3>
                    <p style={{marginTop}}>
                        Pour chaque compétence, l'utilisateur est invité à estimer son niveau de connaissance.
                        Chaque
                        entreprise possède sa propre échelle de valeur.
                        Nous pensons qu'une échelle de 0 à 3 est suffisante.
                    </p>
                    <p style={{marginTop}}>
                        Voici l'échelle que nous avons définie chez Xebia :
                    </p>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <Stars level={0}/></td>
                            <td>
                                Sans expérience mais intéressé(e) par les sujets qui toucheraient à cette
                                compétence.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Stars level={1}/></td>
                            <td>
                                Un(e) débutant(e) qui utilise cette compétence sur un projet personnel ou a
                                assisté/préparé un XKE, .
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Stars level={2}/></td>
                            <td>
                                Un(e) confirmé(e) qui a pratiqué cette compétence sur un ancien projet.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Stars level={3}/></td>
                            <td>
                                Un(e) expert(e) qui met en pratique ou a mis en pratique quasi
                                quotidiennement cette
                                compétence. A fait des audits, des études de performances...
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span
                                    className="interested-icon" style={{color: redA400}}>&#9829;</span></td>
                            <td>
                                Je veux en faire dans ma prochaine mission
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Paper>

                <Paper style={style}>
                    <h3>Que faire si j'ai oublié mon mot de passe ?</h3>
                    <p style={{marginTop}}>
                        Vous devez contacter un des manageurs.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>J'ai trouvé un bug, j'ai une idée, j'ai une question, qui puis-je contacter ?</h3>
                    <p style={{marginTop}}>
                        Vous pouvez ouvrir une demande sur <a
                        href="https://github.com/xebia-france/xskillz-v2/issues" target="blank">Github</a>.
                    </p>
                </Paper>
            </div>
        );
    }
}

export default HelpPage;