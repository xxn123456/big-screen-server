const {
    resolve
} = require('path');

class prod_config {
    constructor(type, content, option, title, targetNames) {
        this.title = title;
        this.targetNames = targetNames;
        this.type = type;
        this.content = content;
        this.option = option;
        this.x = [];
        this.x2 = [];
        this.y = [];
        this.y2 = [];
        this.y3 = [];

    }

    async handleTarget() {


        let new_content = JSON.parse(this.content);


        new_content.forEach((el) => {
            if (el.x) {
                this.x.push(el.x);
            }
            if (el.x2) {
                this.x2.push(el.x2);
            }
            if (el.y) {
                this.y.push(el.y);
            }
            if (el.y2) {
                this.y2.push(el.y2);
            }
            if (el.y3) {
                this.y3.push(el.y3);
            }


        });




    }


    async prod() {

        return new Promise((resolve, rejecte) => {



            let new_option = JSON.parse(this.option);

            this.targetNames = this.targetNames.split(",");

            if (this.type == "折线图") {

                if (this.title) {
                    new_option.title.text = this.title
                }

                if (this.targetNames) {
                    new_option.legend.data = this.targetNames;

                }



                if (this.x.length > 0) {

                    new_option.xAxis.data = this.x;

                }

                if (this.y.length > 0) {

                    new_option.series[0].data = this.y;


                    new_option.series[0].name = this.targetNames[0];





                }

                if (this.y2.length > 0) {

                    new_option.series[1].data = this.y2;

                    new_option.series[1].name = this.targetNames[1];

                }


                if (this.y3.length > 0) {

                    new_option.series[2].data = this.y3;
                    new_option.series[2].name = this.targetNames[2];

                }


            };

            if (this.type == "柱状图") {
                if (this.title) {
                    new_option.title.text = this.title
                }

                if (this.targetNames) {
                    new_option.legend.data = this.targetNames;

                }



                if (this.x.length > 0) {

                    new_option.xAxis.data = this.x;

                }

                if (this.y.length > 0) {

                    new_option.series[0].data = this.y;


                    new_option.series[0].name = this.targetNames[0];





                }

                if (this.y2.length > 0) {

                    new_option.series[1].data = this.y2;

                    new_option.series[1].name = this.targetNames[1];

                }


                if (this.y3.length > 0) {

                    new_option.series[2].data = this.y3;
                    new_option.series[2].name = this.targetNames[2];

                }

            };


            if(this.type=="横向柱状图"){

                if (this.title) {
                    new_option.title.text = this.title
                }

                if (this.targetNames) {
                    new_option.legend.data = this.targetNames;

                }



                if (this.x.length > 0) {

                    new_option.yAxis.data = this.x;

                }

                if (this.y.length > 0) {

                    new_option.series[0].data = this.y;


                    new_option.series[0].name = this.targetNames[0];





                }

                if (this.y2.length > 0) {

                    new_option.series[1].data = this.y2;

                    new_option.series[1].name = this.targetNames[1];

                }


                if (this.y3.length > 0) {

                    new_option.series[2].data = this.y3;
                    new_option.series[2].name = this.targetNames[2];

                }



                




            }


            if(this.type=="扇形图"){

                let new_content = JSON.parse(this.content);

               

                if (this.title) {
                    new_option.title.text = this.title
                }

                if(new_content.length>0){

                    let pie_data =[];

                    let pie_leg = [];
    
                    new_content.forEach((el)=>{
                        pie_data.push({
                            name:el.x,
                            value:el.y
                        });
                        pie_leg.push(el.x)
                    });

                

                    new_option.legend.data = pie_leg;

                    new_option.series[0].data = pie_data;

                   





                }









            }

            resolve(new_option)




        })


    }



}

module.exports = {
    prod_config
}