<template>
<div className="grad">
      <NavbarRegistrationLogin />
      <div className="d-flex justify-content-center ">
        <div className="jumbotron jumbotron-fluid bg-light w-50 rounded shadow reactivescreen">
          <h2 className="text-center text-secondary">Inscription</h2>
          <ul className="nav nav-tabs justify-content-center mb-3" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="student-tab" data-toggle="tab" href="#student" role="tab" aria-controls="student" aria-selected="true">Étudiant</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link text-black" id="monitor-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="false">Moniteur</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link text-black" id="supervisor-tab" data-toggle="tab" href="#supervisor" role="tab" aria-controls="supervisor" aria-selected="false">Superviseur</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab"><StudentRegistration></StudentRegistration></div>
            <div className="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab"><MonitorRegistration></MonitorRegistration></div>
            <div className="tab-pane fade" id="supervisor" role="tabpanel" aria-labelledby="supervisor-tab"><SupervisorRegistration></SupervisorRegistration></div>
          </div>
        </div>
      </div>
    </div>
</template>



<script>
import StudentRegistration from '../Registration/StudentRegistration.vue'
import MonitorRegistration from '../Registration/MonitorRegistration.vue'
import SupervisorRegistration from '../Registration/SupervisorRegistration.vue'

export default {
name: "Registration",
  components: {
      StudentRegistration,
      MonitorRegistration,
      SupervisorRegistration
  }
}
</script>

<style>

</style>