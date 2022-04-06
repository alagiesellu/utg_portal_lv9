<template>

    <table
        class="table table-borderless"
    >
        <thead style="margin-top:3px;border-top:1px solid #8898aa;">
        <tr class="thead-light">
            <th colspan="5" class="text-center">
                <h5>{{term.term.name}}</h5>
            </th>
        </tr>
        <tr class="thead-light cu_small_header">
            <th style="width:10%">Course Code</th>
            <th style="width:55%">Course Description</th>
            <th style="width:10%" class="text-center">Credit Value</th>
            <th style="width:10%" class="text-center">Point</th>
            <th style="width:15%">Grade</th>
        </tr>
        </thead>
        <tbody v-for="grade in term.grades">
        <tr v-for="si in Object.keys(grade.transcript_data)">
            <td>
                {{grade.term_class.course.code}}
            </td>
            <td>
                {{grade.term_class.course.name}}
                <!--print resit-->
                <span v-show="grade.transcript_data[si].is_resit">
                                            (Resit)
                                        </span>
                <!--if grade approved-->
                <span v-if="grade.transcript_data[si].is_not_approved"
                      class="text-danger">
                                            Not Approved
                                        </span>
            </td>
            <td class="text-center">
                {{ grade.term_class.course.credit_hours }}
            </td>
            <td class="text-center">
                {{ parseFloat(grade.transcript_data[si].gs.point).toFixed(2) }}
            </td>
            <td>
                {{grade.transcript_data[si].gs.grade}}
            </td>
        </tr>
        </tbody>
        <thead>
        <tr>
            <td colspan="5"></td>
        </tr>
        </thead>
    </table>

</template>

<script>
    export default {
        name: "NormalTranscriptTable",
        props: ['term'],
        data() {
            return {
            }
        },
    }
</script>

<style scoped>
    #print_trans {
        border: 6px solid #525f7f !important;
        padding:1% !important;
        font-family: 'Roboto' !important;
        /*background-image:url('/img/bg-pattern.jpg');*/
    }
    .cu_small_header>th{
        font-size: 8px !important;
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
