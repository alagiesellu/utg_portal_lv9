<template>
    <span>
        <button type="button" class="btn btn-primary btn-sm btn-block"
                v-on:click="generateReport">
            <i class="ni ni-paper-diploma"></i> Print Transcript</button>
        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="true"
            :filename="(user.num).toString()"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            ref="html2Pdf"
        >
            <section slot="pdf-content">
                <!-- PDF Content Here -->
                <span id="print_transcript">
            <div id="print_trans">
                <div class="row" v-if="profile">
                    <div class="col-12">
                        <div class="row" style="padding-bottom:2%;color:#525f7f;">
                            <div class="col-4">
                                <img class="float-right" src="/img/UTG.gif" height="115">
                            </div>
                            <div class="col-8">
                                <div style="font-family: 'Diploma';font-size:30px;">University of The Gambia</div>
                                <div style="font-size:12px;font-weight:bold;" class="text-uppercase">
                                    Office of The Registrar
                                </div>
                                <small>
                                    MDI Road, Kanifing
                                    P.O. Box 3530,
                                    Serrekunda, The Gambia
                                </small>
                                <div style="font-family: 'Diploma';font-size:20px;">Academic Transcript</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td class="td_name">Student Name</td>
                                    <th>{{$root.full_name(user)}}</th>
                                </tr>
                                <tr>
                                    <td class="td_name">Date of Birth</td>
                                    <th>{{$root.format_date(user.dob)}}</th>
                                </tr>
                                <tr>
                                    <td class="td_name">Matriculation Number</td>
                                    <th>{{user.num}}</th>
                                </tr>
                                <tr v-if="profile.enrolled_at">
                                    <td class="td_name">Date Enrolled</td>
                                    <th>{{$root.format_date(profile.enrolled_at)}}</th>
                                </tr>
                                <tr v-if="profile.completed_at">
                                    <td class="td_name">Date Conferred</td>
                                    <th>{{$root.format_date(profile.completed_at)}}</th>
                                </tr>
                                <tr><td colspan="2"></td></tr>
                                </tbody>
                            </table>
                        </div>
                            <div class="col-6">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td class="td_name">Degree Conferred</td>
                                    <th>{{profile.set.degree}}</th>
                                </tr>
                                <tr>
                                    <td class="td_name">Department</td>
                                    <th>{{profile.set.department.name}}</th>
                                </tr>
                                <tr>
                                    <td class="td_name">School/Faculty</td>
                                    <th>{{profile.set.school_department.name}}</th>
                                </tr>
                                <!--                                <tr>-->
                                <!--                                    <td class="td_name">Major</td>-->
                                <!--                                    <th>{{profile.major_department.name}}</th>-->
                                <!--                                </tr>-->
                                <tr v-if="profile.minor_department">
                                    <td class="td_name">Minor</td>
                                    <th>{{profile.minor_department.name}}</th>
                                </tr>
                                <tr>
                                    <td class="td_name">Date Issued</td>
                                    <th>{{$root.format_date(new Date())}}</th>
                                </tr>
                                <tr><td colspan="2"></td></tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div
                            v-for="i in Object.keys(profile.transcript.terms)"
                            v-if="profile.transcript.terms[i].grades.length"
                        >
                            <div class="html2pdf__page-break"></div>
                            <medical-transcript-table
                                v-if="profile.transcript.terms[i].rotation_grades"
                                :term="profile.transcript.terms[i]"
                                style="margin-top:30px !important;"
                            />
                            <normal-transcript-table
                                v-else
                                :term="profile.transcript.terms[i]"
                                style="margin-top:30px !important;"
                            />
                        </div>
                        <p
                            v-if="profile.major_department.has_rotation"
                            class="pt-6"
                        >
                        </p>
                        <table
                            v-else
                            class="table table-borderless"
                        >
                        <thead style="margin-top:3px;border-top:1px solid #8898aa;">
                            <tr>
                                <th colspan="5" class="text-center">
                                    <span class="h5">
                                        Average Quality Point:
                                    </span>
                                    <span class="h3">
                                        {{profile.transcript.gpa.calculated.toFixed(2)}}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                </div>
            </div>
        </span>
            </section>
        </vue-html2pdf>
    </span>
</template>

<script>
    import MedicalTranscriptTable from "./MedicalTranscriptTable";
    import NormalTranscriptTable from "./NormalTranscriptTable";
    import VueHtml2pdf from 'vue-html2pdf';
    export default {
        name: "TranscriptPrint",
        components: {
            NormalTranscriptTable,
            MedicalTranscriptTable,
            VueHtml2pdf,
        },
        props: ['user','profile'],
        data() {
            return {
            }
        },
        methods: {
            generateReport () {
                this.$refs.html2Pdf.generatePdf();
            },
        }
    }
</script>

<style scoped>
    #print_trans {
        padding:3% !important;
        font-family: 'Roboto' !important;
        /*background-image:url('/img/bg-pattern.jpg');*/
    }
    .cu_small_header>th{
        font-size: 10px !important;
        text-transform: uppercase !important;
    }
    td, th, tr {
        font-size: 12px !important;
        border: 0 !important;
        height:2px !important;
        padding:0px !important;
        margin:0px !important;
    }
    @font-face {
        font-family:"Diploma";
        src: url("/fonts/diploma.ttf") format("truetype");
    }
    .td_name {
        width: 28% !important;
        font-size: 10px !important;
        /*float: right !important;*/
        padding-right: 5px !important;
        padding-top: 1.5px !important;
    }
    .tr_underline {
        text-decoration: underline;
    }
</style>
