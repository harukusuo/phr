import React from 'react';
import '../styles/FAQModal.css';

const FAQModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="faq-modal-overlay">
                <div className="faq-modal">
                    <button className="faq-modal-close" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h2>Perguntas Frequentes</h2>
                    <div className="faq-content">
                        <h3>Qual a finalidade do site PetHelp?</h3>
                        <p>O PetHelp tem como objetivo diminuir o número de animais errantes nas ruas, facilitar reencontros entre tutores e seus pets e, simultaneamente, incentivar a adoção e a doação responsável, com foco na região do Vale do Paranhana.</p>
                        <h3>Como modifico minha foto de perfil?</h3>
                        <p>Para alterar sua foto de perfil, acesse seu perfil e clique na imagem atual. Em seguida, escolha um arquivo de sua galeria ou dispositivo para ser sua nova foto de perfil.</p>
                        <h3>Qual a finalidade dos posts?</h3>
                        <p>Nos posts, os usuários podem se comunicar abertamente sobre assuntos relacionados a animais. Recomendamos o uso para anunciar interesse em adoção, doações, campanhas de vacinação, alertas sobre saúde animal ou eventos relacionados a pets.</p>
                        <h3>Como funciona a aba 'Pets'?</h3>
                        <p>A aba 'Pets' oferece três opções aos usuários: visualizar uma lista de animais encontrados nas ruas e adicionados por outros usuários, visualizar uma lista de animais perdidos por seus tutores e adicionar um novo animal.</p>
                        <h3>Como entro em contato com outro usuário?</h3>
                        <p>Para trocar mensagens com outros usuários da plataforma, é necessário acessar o perfil do usuário desejado e pressionar o botão de enviar mensagem. Não esqueça de checar suas mensagens na aba de 'Chats'.</p>
                        <h3>Perdi um animal, o que faço?</h3>
                        <p>É simples! Vá até a aba 'Pets' e clique em 'Adicionar animal'. Lá, você poderá informar o nome, a espécie, uma breve descrição, uma foto, a cidade e um ponto de referência de onde viu seu pet pela última vez. Certifique-se de marcar o status como 'Perdido'.</p>
                        <h3>Encontrei um animal na rua, o que faço?</h3>
                        <p>Ao encontrar um pet na rua que pareça perdido ou abandonado, recomendamos que você o adicione aos animais encontrados. Para isso, acesse a página de 'Pets' e adicione todas as informações possíveis.</p>
                        <h3>Se meu animal perdido for encontrado, o que faço?</h3>
                        <p>Caso você tenha reencontrado seu pet perdido, não esqueça de ir até a aba 'Pets' no seu perfil, clicar nos três pontos e selecionar 'Excluir pet'.</p>
                        <h3>Se o animal encontrado que postei for adotado/encontrado por seu dono, o que faço?</h3>
                        <p>Nesse caso, vá até a página de 'Pets' em seu perfil, clique nos três pontos e, em seguida, selecione 'Excluir pet'.</p>
                        <h3>Quais medidas de segurança a plataforma oferece para proteger meus dados?</h3>
                        <p>A plataforma PetHelp protege suas informações com criptografia e não compartilha dados pessoais com terceiros sem autorização.</p>
                        <h3>Há algum custo para usar a plataforma?</h3>
                        <p>Não, todos os serviços oferecidos pela PetHelp são gratuitos. Queremos incentivar a comunidade a ajudar os animais sem barreiras financeiras.</p>
                        <h3>Como posso entrar em contato com os desenvolvedores?</h3>
                        <p>Caso deseje relatar um bug, reportar o mau comportamento de usuários, dar uma sugestão ou propor uma parceria com os desenvolvedores, basta entrar em contato pelo seguinte endereço de e-mail: pethelpapoio@gmail.com.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQModal;