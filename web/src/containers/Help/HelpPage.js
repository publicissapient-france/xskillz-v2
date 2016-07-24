import React, {Component} from "react";
import {redA400} from "material-ui/styles/colors";
import Stars from "../../components/Skills/Stars";
import Paper from 'material-ui/Paper';

const style = {
    margin: 20,
    padding: 10
};

export class HelpPage extends Component {
    render() {
        return (
            <div id="main">
                <div className="content">
                    <Paper style={style}>
                        <h4>Pourquoi certaines cartes de compétences sont quasi transparentes ?</h4>
                        <p>
                            Une carte de compétence s'éclaircie lorsqu'elle ne possède pas le petit <span className="interested-icon" style={{color: redA400}}>&#9829;</span>. Ainsi, les compétences qui
                            intéressent le profil consulté sont mises en avant.
                        </p>
                    </Paper>

                    <Paper style={style}>
                        <h4>Que représentent les <Stars level={1}/> ?</h4>
                    <p>
                        Pour chaque compétence, l'utilisateur est invité à estimer son niveau de connaissance. Chaque
                        entreprise possède sa propre échelle de valeur.
                        Nous pensons qu'une échelle de 0 à 3 est suffisante.
                    </p>
                    <p>
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
                                Très intéressé !
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </Paper>

                    <Paper style={style}>
                    <h4>Que faire si j'ai oublié mon mot de passe ?</h4>
                    </Paper>

                    <Paper style={style}>
                        <h4>J'ai trouvé un bug, j'ai une idée, j'ai une question, qui puis-je contacter ?</h4>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default HelpPage;