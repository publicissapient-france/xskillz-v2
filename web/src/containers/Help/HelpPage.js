import React, {Component} from "react";
import {redA400} from "material-ui/styles/colors";
import Stars from "../../components/Skills/Stars";

export class HelpPage extends Component {
    render() {
        return (
            <div id="main">
                <div className="content">
                    <h2>Aide</h2>

                    <h3>Pourquoi certaines cartes de compétences sont quasi transparentes ?</h3>
                    <p>
                        Une carte de compétence s'éclaircie lorsqu'elle ne possède pas le petit <span
                        className="interested-icon" style={{color: redA400}}>&#9829;</span>. Ainsi, les compétences qui
                        intéressent le profil consulté sont mises en avant.
                    </p>

                    <h3>Que représentent les <Stars level={1}/> ?</h3>
                    <p>
                        Pour chaque compétence, l'utilisateur est invité à estimer son niveau de connaissance. Chaque
                        entreprise possède sa propre échelle de valeur.
                        Nous pensons qu'une échelle de 0 à 3 est suffisante.
                    </p>
                    Voici l'échelle que nous avons définie chez Xebia :
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
                                Très intéressé !
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <h3>Que faire si j'ai oublié mon mot de passe ?</h3>
                </div>
            </div>
        );
    }
}

export default HelpPage;