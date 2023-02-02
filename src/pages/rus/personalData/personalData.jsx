import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import { userAgreement } from "../../../store/actions/actions";


export const PersonalData = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigate('/landlords');
    };

    const handleAccept = () => {
        navigate('/landlords');
        dispatch(userAgreement(true));
    };

    return (
        <>
            <Header />
                <div className="container-field container-primary">
                    <main className="main landlords-main">
                        <h4 className="personal-data-header">Положение о защите персональных данных</h4>
                        <div className="personal-data-content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, hic tempore exercitationem rem quam ut alias. Rem perferendis illum est, adipisci odit impedit nobis hic numquam repellendus maxime vitae similique.
                        Placeat porro, consequatur tempore animi illo obcaecati labore neque nulla! Culpa enim sequi rem, adipisci consequatur dolor earum quia, minima error hic illum, amet voluptates animi assumenda ipsum laboriosam voluptas?
                        Voluptatibus facilis obcaecati ea, et, numquam voluptate amet, quisquam illo nisi laborum blanditiis odit culpa aperiam a non in magni vitae harum praesentium earum. Libero natus dolores eligendi incidunt tenetur.
                        Doloremque et, repudiandae at culpa necessitatibus soluta error a, repellendus alias quo nam facilis molestias officiis id expedita dignissimos corrupti amet in, iste quos deserunt rerum? Earum ut ipsam voluptates.
                        Quas eius odit rerum adipisci illo voluptatibus quos, necessitatibus nobis facilis aperiam dolor. Voluptatibus, repudiandae amet, a impedit repellat recusandae exercitationem eius molestiae voluptates facilis rerum commodi asperiores ipsa accusamus.
                        Earum accusamus consequatur aliquam laudantium ex voluptates numquam iusto quaerat eum fuga repudiandae neque, perferendis eveniet modi obcaecati hic saepe et. Tempore nulla nesciunt sunt repudiandae sequi ullam ipsam dolores.
                        Aspernatur rerum consequatur odit blanditiis unde quasi quae voluptate explicabo, corporis adipisci, reprehenderit quibusdam, quo nam illum? Esse recusandae natus voluptatibus quis possimus saepe, voluptates aut animi perferendis nesciunt fuga.
                        Praesentium quam rerum expedita fugiat nesciunt ut obcaecati sapiente officiis, aperiam magnam ducimus est molestiae quis repellendus placeat enim velit molestias excepturi, distinctio quaerat rem sunt! Veritatis pariatur vero error.
                        Fugit, ut, laborum beatae quam iure enim cum soluta amet nesciunt illum quibusdam, asperiores fugiat tempore. Nobis amet sed, aperiam impedit eveniet ipsam ea a, distinctio commodi temporibus voluptatum ducimus.
                        Porro debitis consequatur quidem est doloribus quasi eos dolor tenetur nesciunt. Cumque aliquam ipsam sunt repellendus vel officia vitae? Itaque ex reprehenderit perspiciatis tempore suscipit aliquam ullam facilis voluptatibus enim.
                        Exercitationem quos consequuntur vel enim esse ea assumenda! Excepturi porro nesciunt et, minima sit quasi ducimus voluptatum facere iste nam, iure eos explicabo molestiae perspiciatis, aperiam corporis dolorum dolor tempore!
                        Sapiente deserunt pariatur, ducimus tempora esse temporibus natus, voluptatem, nesciunt magnam culpa iure vero perspiciatis ab harum deleniti soluta? Animi, ex nihil temporibus labore error cumque cum illum dolores molestias!
                        Fuga qui optio dolorem. Magnam sapiente sit, consectetur dolore ut ipsam corrupti vitae, vel eius expedita possimus voluptatibus iste hic maiores minus eum. Vel, ex itaque! Sunt atque amet eveniet!
                        Quas ducimus dolore voluptates et quo corrupti reprehenderit voluptate numquam, fugit ad autem! In ut odio temporibus doloremque nostrum sapiente, quam facilis eveniet, saepe necessitatibus adipisci est. Accusantium, beatae est.
                        Corporis delectus quo iste explicabo, cupiditate consectetur adipisci exercitationem hic sed, numquam, obcaecati earum repellendus perspiciatis? Et atque labore aliquam sint beatae maiores, illo itaque laboriosam enim eum quas ab.
                        Illo voluptas magni modi quaerat tenetur illum ipsa incidunt ducimus itaque, libero doloribus quod inventore amet nemo quam optio. Accusantium odio doloribus, voluptas ipsum totam voluptatibus eligendi minus temporibus est!
                        Mollitia asperiores inventore velit nostrum vero. Labore nam deserunt numquam, voluptatibus dolorem dignissimos doloremque libero sunt aliquam molestias ullam repellat! Assumenda facere dignissimos molestias recusandae magni dolorum vel quos nisi.
                        Reprehenderit enim consequatur adipisci earum repellat nulla expedita porro soluta in ullam quae dolores id ipsum, at, suscipit explicabo? Ipsum illum delectus veniam distinctio molestias eius. At, dicta suscipit. Quisquam!
                        Expedita eligendi molestiae nisi exercitationem alias repellat eum adipisci commodi ea odio quis error aperiam quia minus accusantium sapiente nesciunt sequi modi doloribus totam nemo iste possimus, cum neque. Molestiae.
                        Eius autem harum facilis asperiores enim quia ad quos dolores quod suscipit, odio laboriosam accusamus voluptatum, quo placeat soluta porro sint nihil delectus quisquam id? Modi mollitia magnam temporibus vel?
                        Ipsam cupiditate neque aut excepturi aliquam voluptatibus, perspiciatis voluptates, quia error quis id architecto! Eligendi, corporis voluptates labore obcaecati eveniet aliquid voluptas, ea ducimus temporibus facere aliquam facilis laboriosam quasi.
                        Dolorem, libero. Officiis, nulla obcaecati porro doloremque enim architecto eos quia neque itaque accusamus eius sit possimus, aliquid aliquam. Doloribus neque veritatis itaque alias? Nisi odit error illo nemo adipisci?
                        Dignissimos magnam sunt, illo accusamus quis nulla nesciunt neque ut eius corporis adipisci illum? Enim iusto earum veritatis, cumque sit autem non dolore recusandae temporibus quam sed officiis voluptas animi.
                        Autem officia praesentium facere, suscipit hic veniam eligendi dolores dignissimos nostrum deleniti tempore doloremque, error excepturi et molestiae reiciendis voluptatibus quidem! Illo ex maxime illum aperiam cupiditate quis quas consequatur!
                        Illo quam veritatis velit officia ea. Dignissimos voluptatibus, enim numquam dolor nisi itaque cupiditate aliquid, perferendis vel quod voluptatum illum repellat. Repellat maiores vel architecto libero, ab fugiat asperiores veritatis!
                        Fugiat adipisci eos ea voluptatem, animi sit ratione deserunt voluptatibus hic consequuntur non aliquid vitae eum atque, repellendus officia harum. Sapiente nesciunt laboriosam asperiores blanditiis? Libero voluptatibus pariatur repellat rem.
                        Necessitatibus quae quo similique quibusdam optio culpa fuga architecto molestiae debitis, asperiores dolor blanditiis quisquam dicta modi illo sapiente libero minima soluta atque velit distinctio et veniam! Dicta, maxime quo.
                        Id amet assumenda quos. Voluptates voluptatem cupiditate eum et minus repellendus quis aperiam, earum totam eligendi at excepturi, nobis eos cumque vitae modi quibusdam architecto? Consequatur cum ipsum cumque error?
                        Labore expedita ex culpa ullam atque pariatur repellat, aut quo ab? Dolorum blanditiis fugiat neque reiciendis eius, laborum id necessitatibus placeat error deleniti dignissimos commodi possimus veritatis perspiciatis excepturi accusamus!
                        Vitae ex libero illum quisquam laudantium expedita possimus ut enim in repellat. Cumque vero dolores, consectetur laudantium in nulla sequi eius rerum quas, quam molestiae quos enim quis. In, earum?
                        Numquam at recusandae quis sunt velit iusto ducimus laboriosam consectetur quos ab cum placeat blanditiis error ut inventore sit rem quibusdam, vel minima harum. Sint beatae tempore quisquam perferendis pariatur!
                        Vel saepe perspiciatis hic ex fugiat ut corporis est soluta labore! Voluptatem earum at quos totam molestias esse ipsam voluptas corporis maiores ea necessitatibus, unde tenetur doloribus quod debitis! Eligendi.
                        Possimus saepe laboriosam, magni quidem magnam illum excepturi quibusdam delectus distinctio quasi iste ab ea debitis veniam facere explicabo quod a asperiores maxime consequuntur doloremque aliquam exercitationem sapiente iure? Temporibus.
                        Veniam perferendis eos doloribus dicta blanditiis quis temporibus aliquam accusamus minus eveniet inventore porro hic id totam, pariatur sit quisquam distinctio at ad doloremque? Sed repellat reiciendis sapiente soluta dolore.
                        Nemo laudantium explicabo soluta architecto odio provident maiores alias facere saepe, praesentium ipsam laboriosam accusantium eveniet aliquam aliquid sint dolores perspiciatis! Explicabo quibusdam quo eos est voluptatum doloribus voluptate mollitia?
                        Dignissimos rerum reiciendis cum repudiandae totam officiis molestias maiores deserunt, eveniet, nostrum veritatis minus aut commodi, alias ratione! Itaque molestiae perspiciatis facere aliquam inventore eveniet et odit amet quibusdam mollitia!
                        Nostrum necessitatibus, deserunt quae doloremque et excepturi alias dignissimos nisi culpa saepe blanditiis porro consequuntur sit explicabo ipsam temporibus perspiciatis magnam facere modi voluptate quam delectus totam voluptates? Blanditiis, assumenda?
                        Dolor est fuga sequi doloremque ea, cumque illo voluptates culpa voluptatem eius harum, exercitationem consequatur rerum dolorum quam sed magni assumenda ipsam similique! Officia harum odit porro commodi earum laboriosam!
                        Maxime iusto mollitia omnis nesciunt suscipit laboriosam inventore voluptas velit consequuntur. Error est mollitia debitis, quia dolorem placeat ducimus? Quos nemo dicta eos facilis praesentium quo qui optio eius voluptas.
                        Ad sunt quia error neque et iusto deleniti dolorem asperiores obcaecati, architecto temporibus laborum, quo itaque consectetur voluptas blanditiis, aliquam omnis! Dolor distinctio labore quod quo odio facere excepturi debitis!</div>
                        <button onClick={handleAccept} className="btn btn-primary landlord-button">Подписать соглашение</button>
                        <button onClick={handleBack} className="btn btn-primary landlord-button-red">Вернуться назад</button>
                    </main>
                </div>   
            <Footer />
        </>
    );
}

export default PersonalData;