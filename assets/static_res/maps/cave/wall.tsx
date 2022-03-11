<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.8" tiledversion="1.8.2" name="wall" tilewidth="195" tileheight="65" tilecount="21" columns="0">
 <grid orientation="orthogonal" width="1" height="1"/>
 <tile id="0">
  <properties>
   <property name="kind" value="dy_wall"/>
   <property name="prefab" value="dy_wall"/>
  </properties>
  <image width="65" height="65" source="wall_breakable_skin.png"/>
 </tile>
 <tile id="1">
  <properties>
   <property name="kind" value="dy_wall"/>
   <property name="prefab" value="dy_wall"/>
   <property name="type" type="int" value="1"/>
  </properties>
  <image width="32" height="32" source="new/zhuantou.png"/>
 </tile>
 <tile id="2">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/turangcaoping.png"/>
 </tile>
 <tile id="5">
  <properties>
   <property name="iswall" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="env/shui guan (1).png"/>
 </tile>
 <tile id="6">
  <image width="32" height="32" source="env/shui guan.png"/>
 </tile>
 <tile id="7">
  <properties>
   <property name="kind" value="dy_wall"/>
   <property name="prefab" value="dy_wall"/>
   <property name="type" type="int" value="2"/>
  </properties>
  <image width="32" height="32" source="new/wenhao.png"/>
 </tile>
 <tile id="10">
  <image width="32" height="32" source="new/turangcaoping.png"/>
 </tile>
 <tile id="12">
  <image width="61" height="32" source="env/yuncai.png"/>
 </tile>
 <tile id="13">
  <image width="195" height="32" source="env/cao1.png"/>
 </tile>
 <tile id="14">
  <image width="127" height="32" source="env/cao2.png"/>
 </tile>
 <tile id="17">
  <properties>
   <property name="iswall" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/turang.png"/>
 </tile>
 <tile id="33">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/turangcaoping.png"/>
 </tile>
 <tile id="41">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/yunduo.png"/>
 </tile>
 <tile id="46">
  <properties>
   <property name="kind" value="Ladder"/>
   <property name="prefab" value="ladder_up"/>
  </properties>
  <image width="32" height="32" source="new/tiziduan.png"/>
 </tile>
 <tile id="47">
  <properties>
   <property name="kind" value="Ladder"/>
   <property name="prefab" value="ladder_m"/>
  </properties>
  <image width="32" height="32" source="new/tizi1.png"/>
 </tile>
 <tile id="48">
  <properties>
   <property name="kind" value="Ladder"/>
   <property name="prefab" value="ladder_b"/>
  </properties>
  <image width="32" height="32" source="new/tizi2.png"/>
 </tile>
 <tile id="49">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/fukongzuoce.png"/>
 </tile>
 <tile id="50">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/fukong.png"/>
 </tile>
 <tile id="51">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/fukongyouce.png"/>
 </tile>
 <tile id="52">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/caodiyou.png"/>
 </tile>
 <tile id="53">
  <properties>
   <property name="isCollide" type="bool" value="true"/>
  </properties>
  <image width="32" height="32" source="new/caodizuo.png"/>
 </tile>
</tileset>
