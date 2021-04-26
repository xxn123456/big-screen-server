const {
    resolve
} = require('path');

class prod_config {
    constructor(type, content, option,title) {
        this.title=title;
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

        // 折线图 [{"x":"洪山区","y":"11"}];
        return new Promise((resolve, rejecte) => {

            let new_option = JSON.parse(this.option);

            if (this.type == "折线图") {

                if(this.title){
                    new_option.title.text=this.title
                }

                if(this.x.length>0){

                    new_option.xAxis.data = this.x;

                }

                if(this.y.length>0){

                    new_option.series[0].data = this.y;

                }

                if(this.y2.length>0){

                    new_option.series[1].data = this.y2;

                }


                if(this.y3.length>0){

                    new_option.series[2].data = this.y3;

                }


            };

            resolve(new_option)




        })


    }



}

module.exports = {
    prod_config
}