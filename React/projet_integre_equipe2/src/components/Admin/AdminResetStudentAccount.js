import React from 'react'

const AdminResetStudentAccount = ({ resetAccount, student }) => {



    return (
        <div>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#resetAccountModal">
                Réinitialiser
            </button>

            <div class="modal fade" id="resetAccountModal" tabindex="-1" aria-labelledby="resetAccountModalLabel" aria-hidden="true">
                <div class="modal-lg modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="resetAccountModalLabel">Réinitialiser un compte étudiant</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Cette option permet de réinitilaiser un compte étudiant lorsque celui-ci est rendu à une nouvelle session de stage.
                            Il est possible, également, de réinitialiser un compte qui contient des erreurs. À noter qu'il n'efface pas les données de l'étudiant,
                            cette option permet simplement de remettre le statut de l'étudiant à "En recherche" et d'invalider son compte.
                        </div>
                        <div class="modal-footer justify-content-between">
                            <span className="text-danger">
                                <i className="fas fa-exclamation-circle mr-2"></i>Veuillez noter que cette action est irréversible
                            </span>
                            <div>
                                <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    class="btn btn-danger mr-2"
                                    onClick={e => {
                                        e.preventDefault(); 
                                        resetAccount(student)
                                    }}
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminResetStudentAccount
