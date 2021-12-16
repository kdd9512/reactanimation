# Variant

1. 주고자 하는 animation 효과가 설정된 상수를 삽입하여 해당 태그에 그 효과를 부여한다. 
   

        * animation 의 시작점(start)과 종료점(end)을 설정하면 그 사이에 일어나는 모든 변화가
        * animation 이 되는 방식.


2. 이하 2가지 옵션은 **자식요소에 inherit** 된다. 

   즉, 해당 부분에 들어갈 요소만 이름을 맞춰놓으면 자식들은 initial / animate 쓸 필요가 없음


        * initial : 최초 시작점(start)에 부여된 설정을 지정하고 효과를 부여한다.

        * animate : 종료점(end)에 부여된 설정을 지정하고 효과를 부여한다.


3. **부모요소가 자식요소에** 특정한 CSS 효과를 부여할 수 있다. 이하는 그 일부.

         * delayChildren:시간 - 이 태그의 자식요소에 delay 효과를 부여한다.

         ** staggerChildren:시간 - 이 태그의 자식요소"들"에 각각 설정한 시간만큼의 간격으로 
          효과를 부여한다. 즉, 자식 요소들에 효과가 적용되는데 시간차가 생긴다.


# while~
* ~하는 동안 해당 animation 이 적용된다.

        whileHover : 커서를 올려놓았을 때 설정된 animation 을 출력.
        whileTap : 요소를 클릭했을 때 설정된 animation 을 출력.
        whileDrag : 요소를 drag 할 때 설정된 animation 을 출력.

        ** 이 요소들에 색상을 설정할 경우 반드시 숫자/rgba/hash 포맷으로
        입력해야만 정상동작한다. 
        ("whitesmoke" 이런건 동작안함.)



# drag

### drag 효과를 부여하고 싶은 요소에 그냥 **drag** 라고 입력한다.


1. **dragConstraints** : 대상의 drag 가능한 범위를 제한할 수 있다.
   

2. **dragSnapToOrigin** : drag 대상이 animation 출력 후 원위치로 돌아가게끔 한다.


3. **dragElastic={수치(기본 0.5, 최대1)}** : drag 대상에 **윈위치에서 당기는 힘**을 
   부여한다. 이 속성을 적용하면 대상을 drag 했을 시, 마우스를 움직인 것 만큼 잘 안끌려오게 된다.
   






        