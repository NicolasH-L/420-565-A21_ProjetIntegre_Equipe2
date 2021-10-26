<template>
  <div className="grad">
            <div className="d-flex justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-light rounded w-50 shadow reactivescreen">
                    <h2 className="text-center text-secondary">Login</h2>
                    <ul className="nav nav-tabs justify-content-center mb-3" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active text-black" id="student-tab" data-toggle="tab" href="#student" role="tab" aria-controls="student" aria-selected="false">Étudiant</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-black" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-black" id="supervisor-tab" data-toggle="tab" href="#supervisor" role="tab" aria-controls="supervisor" aria-selected="false">Superviseur</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-black" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin" aria-selected="false">Gestionnaire</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab" ><StudentLogin></StudentLogin></div>
                        <div className="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorLogin></MonitorLogin></div>
                        <div className="tab-pane fade" id="supervisor" role="tabpanel" aria-labelledby="supervisor-tab"><SupervisorLogin></SupervisorLogin></div>
                        <div className="tab-pane fade" id="admin" role="tabpanel" aria-labelledby="admin-tab"><AdminLogin></AdminLogin></div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import StudentLogin from '../Login/StudentLogin.vue'
import MonitorLogin from '../Login/MonitorLogin.vue'
import AdminLogin from '../Login/AdminLogin.vue'
import SupervisorLogin from '../Login/SupervisorLogin.vue'

export default {
    name: 'Login',
  components: {
      StudentLogin,
      MonitorLogin,
      AdminLogin,
      SupervisorLogin
  }
}
</script>

<style>

</style>